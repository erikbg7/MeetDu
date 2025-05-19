export const SYNC_USER_ERROR = 'SyncUserError';
export const SYNC_USER_NOT_FOUND = 'SyncUserNotFound';
export const GET_TOP_USERS_ERROR = 'GetTopUsersError';

export class SyncUserError extends Error {
	constructor() {
		super();
		this.name = SYNC_USER_ERROR;
		this.message = 'An error occurred while syncing user data';
	}
}
export class SyncedUserNotFoundError extends Error {
	constructor() {
		super();
		this.name = SYNC_USER_NOT_FOUND;
		this.message = 'Synced user not found';
	}
}

export class GetTopUsersError extends Error {
	constructor() {
		super();
		this.name = GET_TOP_USERS_ERROR;
		this.message = 'An error occurred while fetching top users';
	}
}

export class FollowUserError extends Error {
	constructor() {
		super();
		this.name = 'FollowUserError';
		this.message = 'An error occurred while following user';
	}
}
