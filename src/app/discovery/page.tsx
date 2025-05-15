import { SyncUserError } from '@/lib/errors';
import {
	followUser,
	getTopUsers,
	syncUserOnFirstLogin,
} from '@/app/discovery/actions';

import UsersGrid from '@/app/discovery/UsersGrid';

export default async function DiscoveryPage() {
	const result = await syncUserOnFirstLogin();

	if (!result.success) {
		throw new SyncUserError();
	}

	return <UsersGrid loadUsers={getTopUsers} followUser={followUser} />;
}
