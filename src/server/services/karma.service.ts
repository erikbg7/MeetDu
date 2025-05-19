import { db } from '@/server/db';
import { eq, sql, desc, notInArray } from 'drizzle-orm';
import {
	karmaEvent,
	profile,
	PublicProfile,
	publicProfileColumns,
} from '@/server/db/schema';
import { UserService } from '@/server/services/user.service';
import { EventType } from '@/constants';

export class KarmaService {
	static async getKarma(userId: string) {
		const [user] = await db
			.select({ karma: profile.karma })
			.from(profile)
			.where(eq(profile.id, userId));

		if (!user) {
			await KarmaService.handleNotFoundError();
		}

		return user?.karma || 0;
	}

	static async handleNotFoundError() {
		const userService = await UserService.init();
		await userService.setAsSynced(false);
	}

	static async updateUsersKarma(followerId: string, followedUsername: string) {
		return await db.transaction(async (tx) => {
			// decrement karma of following
			const [followingUser] = await tx
				.update(profile)
				.set({ karma: sql`${profile.karma} - 1` })
				.where(eq(profile.username, followedUsername))
				.returning({ id: profile.id });

			// increment karma of follower
			const [followerUser] = await tx
				.update(profile)
				.set({ karma: sql`${profile.karma} + 1` })
				.where(eq(profile.id, followerId))
				.returning({ id: profile.id });

			if (!followingUser || !followerUser) {
				await KarmaService.handleNotFoundError();
			}

			// create karma event notifications for both users
			await db.insert(karmaEvent).values([
				{
					userId: followingUser.id,
					type: EventType.DECREASE,
				},
				{
					userId: followerUser.id,
					type: EventType.INCREASE,
				},
			]);
		});
	}

	static async getTopUsers(
		validator: (username: string) => Promise<boolean>,
		blacklist: PublicProfile['username'][],
		profiles: PublicProfile[],
		amount: number,
	): Promise<PublicProfile[]> {
		const topProfiles = await db
			.select(publicProfileColumns)
			.from(profile)
			.where(notInArray(profile.username, blacklist)) // exclude followed and self
			.orderBy(desc(profile.karma))
			.limit(amount);

		const isFollowed = await Promise.all(
			topProfiles.map(async (user) => validator(user.username)),
		);

		const unfollowedProfiles = topProfiles.filter((_, i) => !isFollowed[i]);
		const allUnfollowedProfiles = [...profiles, ...unfollowedProfiles];

		if (unfollowedProfiles.length === amount || topProfiles.length < amount) {
			return allUnfollowedProfiles;
		}

		const newAmount = amount - unfollowedProfiles.length;
		const newBlacklist = [
			...blacklist,
			...topProfiles.map((profile) => profile.username),
		];

		return this.getTopUsers(
			validator,
			newBlacklist,
			allUnfollowedProfiles,
			newAmount,
		);
	}
}
