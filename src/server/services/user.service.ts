import { clerkClient, currentUser } from '@clerk/nextjs/server';

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

	async setAsSynced() {
		await this.client.users.updateUser(this.user.id, {
			privateMetadata: {
				...this.user.privateMetadata,
				synced: true,
			},
		});
	}
}
