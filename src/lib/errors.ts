export const SYNC_USER_ERROR = 'SyncUserError';
export const GET_TOP_USERS_ERROR = 'GetTopUsersError';

export class SyncUserError extends Error {
	constructor() {
		super();
		this.name = SYNC_USER_ERROR;
		this.message = 'An error occurred while syncing user data';
	}
}

export class GetTopUsersError extends Error {
	constructor() {
		super();
		this.name = GET_TOP_USERS_ERROR;
		this.message = 'An error occurred while fetching top users';
	}
}
