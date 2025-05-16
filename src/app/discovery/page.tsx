import { GetTopUsersError, SyncUserError } from '@/lib/errors';
import {
	followUser,
	getTopUsers,
	syncUserOnFirstLogin,
} from '@/app/discovery/actions';

import UserCard from '@/components/discovery/user-card';
import FollowButton from '@/components/discovery/follow-button';

export default async function DiscoveryPage() {
	const syncing = await syncUserOnFirstLogin();
	if (!syncing.success) throw new SyncUserError();

	const users = await getTopUsers();
	if (!users.success) throw new GetTopUsersError();

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{users.data.map((user) => (
				<UserCard key={user.githubId} user={user}>
					<FollowButton username={user.username} onSubmit={followUser} />
				</UserCard>
			))}
		</div>
	);
}
