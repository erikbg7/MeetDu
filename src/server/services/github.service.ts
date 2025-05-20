import { Octokit } from '@octokit/rest';
import { ProfileInsert } from '@/server/db/schema';

type GetUserProfile = Awaited<
	ReturnType<typeof GithubApiService.prototype.getUserProfile>
>;

export class GithubApiService {
	private api: Octokit;

	constructor(accessToken: string) {
		this.api = new Octokit({ auth: accessToken });
	}

	async getUserProfile() {
		const res = await this.api.rest.users.getAuthenticated();

		if (res.status !== 200 || !res.data) {
			throw new Error('Failed to fetch user profile');
		}

		return res.data;
	}

	async getProfileByUsername(username: string) {
		const res = await this.api.rest.users.getByUsername({
			username,
		});
		if (res.status !== 200 || !res.data) {
			throw new Error('Failed to fetch user profile');
		}
		return res.data;
	}

	async getFollowedUsers(username: string, amount: number = 20) {
		const res = await this.api.rest.users.listFollowingForUser({
			username,
			per_page: amount,
		});
		if (res.status !== 200 || !res.data) {
			throw new Error('Failed to fetch followed users');
		}
		return res.data;
	}

	async followUser(username: string) {
		const res = await this.api.rest.users.follow({ username });

		if (res.status !== 204) {
			throw new Error('Failed to follow user');
		}

		return res.data;
	}

	async unfollowUser(username: string) {
		try {
			const res = await this.api.rest.users.unfollow({ username });
			return res.data;
		} catch (e) {
			console.log({ e });
			// Must handle the error here, but we don't care about failure
		}
	}

	async isFollowing(username: string) {
		try {
			const response =
				await this.api.rest.users.checkPersonIsFollowedByAuthenticated({
					username,
				});

			// 204 No Content means the authenticated user is following the target user
			return response.status === 204;
			// eslint-disable-next-line
		} catch (error) {
			// Error means the authenticated user is not following the target user
			return false;
		}
	}

	static toProfileInsert(profile: GetUserProfile): ProfileInsert {
		return {
			id: String(profile.id),
			githubId: profile.id,
			username: profile.login || '',
			name: profile.name || '',
			bio: profile.bio || '',
			location: profile.location || '',
			url: profile.html_url || '',
			avatar: profile.avatar_url || '',
			repos: profile.public_repos || 0,
		};
	}

	static toProfileInsertWithRandomKarma(profile: GetUserProfile) {
		return {
			id: String(profile.id),
			githubId: profile.id,
			username: profile.login || '',
			name: profile.name || '',
			repos: profile.public_repos || 0,
			bio: profile.bio || '',
			location: profile.location || '',
			url: profile.html_url || '',
			avatar: profile.avatar_url || '',
			karma: Math.floor(Math.random() * 15),
		};
	}
}
