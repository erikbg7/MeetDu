import { db } from '@/server/db';
import { getTableColumns } from 'drizzle-orm';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { profile, ProfileInsert } from '@/server/db/schema';

export class UserService {
	constructor(
		private user: NonNullable<Awaited<ReturnType<typeof currentUser>>>,
		private client: Awaited<ReturnType<typeof clerkClient>>,
	) {}

	static async init() {
		const user = await currentUser();
		const client = await clerkClient();

		if (!user) throw new Error('No user found');
		if (!client) throw new Error('No client found');
		if (!user.id) throw new Error('No user ID found');
		if (!user.username) throw new Error('No username found');

		return new UserService(user, client);
	}

	get userId() {
		return this.user.id;
	}

	get username() {
		return this.user.username as string;
	}

	get synced() {
		return this.user.privateMetadata?.synced === true;
	}

	get githubId() {
		const githubAccount = this.user.externalAccounts.find(
			(account) => account.provider === 'oauth_github',
		);

		if (!githubAccount) {
			throw new Error('Github account not found');
		}

		return githubAccount.externalId;
	}

	async getOauthToken() {
		const provider = `github`;
		const response = await this.client.users.getUserOauthAccessToken(
			this.user.id,
			provider,
		);

		const accessToken = response?.data?.[0]?.token;

		if (!accessToken) {
			throw new Error('No access token found');
		}
		return accessToken;
	}

	async setAsSynced() {
		await this.client.users.updateUser(this.user.id, {
			privateMetadata: {
				...this.user.privateMetadata,
				synced: true,
			},
		});
	}

	async createProfile(newProfile: ProfileInsert) {
		const [createProfile] = await db
			.insert(profile)
			.values(newProfile)
			.returning(getTableColumns(profile))
			.onConflictDoNothing();

		this.setAsSynced();

		return createProfile;
	}
}
