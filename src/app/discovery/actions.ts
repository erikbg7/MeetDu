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

		await KarmaService.updateUsersKarma(userService.githubId, username);

		return success(null);
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
			[],
			DISCOVERY_CARDS_AMOUNT,
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
