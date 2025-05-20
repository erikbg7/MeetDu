/* eslint-disable react/no-unescaped-entities */

export const dynamic = 'force-dynamic'; // allows headers, disables SSG

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

	if (users.data.length === 0) {
		return (
			<div className="container mx-auto flex h-[50vh] flex-col items-center justify-center">
				<h2 className="text-xl font-semibold">
					Have you really followed everyone?
				</h2>
				<p className="text-muted-foreground">
					Can't find more users to follow at this moment. Try again in a while
					:P
				</p>
			</div>
		);
	}

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
