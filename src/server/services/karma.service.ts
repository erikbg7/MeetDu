import { db } from '@/server/db';
import { eq, sql, desc, notInArray } from 'drizzle-orm';
import {
	profile,
	PublicProfile,
	publicProfileColumns,
} from '@/server/db/schema';
import { UserService } from '@/server/services/user.service';

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

	static async updateUsersKarma(followerId: string, followingUsername: string) {
		return await db.transaction(async (tx) => {
			// decrement karma of following
			await tx
				.update(profile)
				.set({ karma: sql`${profile.karma} - 1` })
				.where(eq(profile.username, followingUsername));

			// increment karma of follower
			const [followerData] = await tx
				.update(profile)
				.set({ karma: sql`${profile.karma} + 1` })
				.where(eq(profile.id, followerId))
				.returning(publicProfileColumns);

			if (!followerData) {
				await KarmaService.handleNotFoundError();
			}

			return followerData.karma;
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
