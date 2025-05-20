'use server';

import { z } from 'zod';
import { PublicProfile } from '@/server/db/schema';
import { KarmaService } from '@/server/services/karma.service';
import { GithubApiService } from '@/server/services/github.service';
import { UserService } from '@/server/services/user.service';
import { ServerActionResult, failure, success } from '@/lib/server-actions';
import { DISCOVERY_CARDS_AMOUNT } from '@/constants';

async function syncUserOnFirstLogin(): Promise<ServerActionResult<null>> {
	try {
		const userService = await UserService.init();

		if (!userService.synced) {
			const accessToken = await userService.getOauthToken();
			const githubApi = new GithubApiService(accessToken);
			const githubProfile = await githubApi.getUserProfile();
			const profile = GithubApiService.toProfileInsert(githubProfile);
			await userService.createProfile(profile);
		}

		return success(null);
	} catch (error) {
		return failure(error);
	}
}

const followUserSchema = z.object({
	username: z.string().min(1).max(40).trim(),
});

async function followUser(
	formData: FormData,
): Promise<ServerActionResult<null>> {
	try {
		const data = Object.fromEntries(formData.entries());
		const { username } = followUserSchema.parse(data);

		const userService = await UserService.init();
		const accessToken = await userService.getOauthToken();

		const githubApi = new GithubApiService(accessToken);
		await githubApi.followUser(username);

		const updated = await KarmaService.updateUsersKarma(
			userService.githubId,
			username,
		);

		if (!updated) githubApi.unfollowUser(username);

		return success(null);
	} catch (error) {
		return failure(error);
	}
}

export type GetUserKarmaResult = {
	userId: string;
	karma: number;
};
async function getUserKarma(): Promise<GetUserKarmaResult> {
	try {
		const userService = await UserService.init();

		const karma = await KarmaService.getKarma(userService.userId);

		return {
			userId: userService.userId,
			karma,
		};
	} catch (error) {
		console.error('Error fetching user karma:', error);
		return { userId: '', karma: 0 };
	}
}

async function getTopUsers(): Promise<ServerActionResult<PublicProfile[]>> {
	try {
		const userService = await UserService.init();
		const accessToken = await userService.getOauthToken();

		const githubApi = new GithubApiService(accessToken);

		const topKarmaUsers = await KarmaService.getTopUsers(
			githubApi.isFollowing.bind(githubApi),
			[userService.username],
			[],
			DISCOVERY_CARDS_AMOUNT,
		);

		return success(topKarmaUsers);
	} catch (error) {
		return failure(error);
	}
}

// populate action can be used while testing to populate the database with real GitHub users
// by default it get the first 20 followed users of the user 'dawsbot'
// and creates a profile for each of them
export async function populate(): Promise<ServerActionResult<null>> {
	try {
		const userService = await UserService.init();
		const accessToken = await userService.getOauthToken();

		const githubApi = new GithubApiService(accessToken);
		const following = await githubApi.getFollowedUsers('dawsbot');

		const followingProfiles = await Promise.all(
			following.map((user) => {
				return githubApi
					.getProfileByUsername(user.login)
					.then(GithubApiService.toProfileInsertWithRandomKarma);
			}),
		);

		await Promise.all(followingProfiles.map(userService.createProfile));

		return success(null);
	} catch (error) {
		return failure(error);
	}
}
export type SyncUserOnFirstLoginAction = typeof syncUserOnFirstLogin;
export type FollowUserAction = typeof followUser;
export type GetTopUsersAction = typeof getTopUsers;

export { syncUserOnFirstLogin, followUser, getTopUsers, getUserKarma };
