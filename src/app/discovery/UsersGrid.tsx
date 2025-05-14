import { FollowUserAction, GetTopUsersAction } from '@/app/discovery/actions';
import UserCard from '@/app/discovery/UserCard';

export default async function UsersGrid({
	loadUsers,
	followUser,
}: {
	loadUsers: GetTopUsersAction;
	followUser: FollowUserAction;
}) {
	const users = await loadUsers();

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{users.success &&
				users.data.map((user) => (
					<UserCard key={user.githubId} user={user} followUser={followUser} />
				))}
		</div>
	);
}
