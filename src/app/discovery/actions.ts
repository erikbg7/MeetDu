import { ServerActionResult, failure, success } from '@/lib/server-actions';
import { GithubApiService } from '@/server/services/github.service';
import { UserService } from '@/server/services/user.service';

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

export type SyncUserOnFirstLoginAction = typeof syncUserOnFirstLogin;
export { syncUserOnFirstLogin };
