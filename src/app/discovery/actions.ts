'use server';

import { ServerActionResult, failure, success } from '@/lib/server-actions';
import { GithubApiService } from '@/server/services/github.service';
import { UserService } from '@/server/services/user.service';
import { KarmaService } from '@/server/services/karma.service';
import { PublicProfile } from '@/server/db/schema';

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

async function followUser(
	username: string,
): Promise<ServerActionResult<number>> {
	try {
		const userService = await UserService.init();
		const accessToken = await userService.getOauthToken();

		const githubApi = new GithubApiService(accessToken);
		await githubApi.followUser(username);

		const karma = await KarmaService.updateUsersKarma(
			userService.githubId,
			username,
		);

		return success(karma);
	} catch (error) {
		return failure(error);
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
		);

		return success(topKarmaUsers);
	} catch (error) {
		return failure(error);
	}
}

export type SyncUserOnFirstLoginAction = typeof syncUserOnFirstLogin;
export type FollowUserAction = typeof followUser;
export type GetTopUsersAction = typeof getTopUsers;

export { syncUserOnFirstLogin, followUser, getTopUsers };
