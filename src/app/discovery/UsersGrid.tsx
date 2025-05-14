import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, LinkIcon, GitFork, Star } from 'lucide-react';
import { FollowUserAction, GetTopUsersAction } from '@/app/discovery/actions';
import { PublicProfile } from '@/server/db/schema';
import { FollowButton } from '@/app/discovery/FollowButton';

export default async function UsersGrid({
	loadUsers,
	followUser,
}: {
	loadUsers: GetTopUsersAction;
	followUser: FollowUserAction;
}) {
	const users = await loadUsers();

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{users.success &&
				users.data.map((user) => (
					<UserCard key={user.githubId} user={user} followUser={followUser} />
				))}
		</div>
	);
}

interface UserCardProps {
	user: PublicProfile;
	followUser: FollowUserAction;
}
function UserCard({ user, followUser }: UserCardProps) {
	return (
		<Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
			<CardHeader className="pb-2">
				<div className="flex items-start gap-4">
					<Avatar className="h-16 w-16 border">
						<AvatarImage
							src={user.avatar || '/placeholder.svg?height=64&width=64'}
							alt={user.username}
						/>
						<AvatarFallback>
							{user.username.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h3 className="text-lg font-semibold">{user.name}</h3>
						<p className="text-muted-foreground text-sm">@{user.username}</p>
						{user.location && (
							<div className="text-muted-foreground flex items-center text-sm">
								<MapPin className="mr-1 h-3.5 w-3.5" />
								{user.location}
							</div>
						)}
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex-grow pb-4">
				{user.bio && <p className="mb-3 text-sm">{user.bio}</p>}

				<div className="mb-3 flex flex-wrap gap-2">
					<Badge variant="secondary" className="flex items-center gap-1">
						<GitFork className="h-3.5 w-3.5" />
						{user.repos} repos
					</Badge>
					<Badge variant="outline" className="flex items-center gap-1">
						<Star className="h-3.5 w-3.5" />
						{user.karma} karma
					</Badge>
				</div>

				{user.url && (
					<div className="flex items-center text-sm">
						<LinkIcon className="text-muted-foreground mr-1 h-3.5 w-3.5" />
						<a
							href={user.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary max-w-[200px] truncate hover:underline"
						>
							{user.url.replace(/^https?:\/\//, '')}
						</a>
					</div>
				)}
			</CardContent>
			<CardFooter className="mt-auto pt-0">
				<FollowButton username={user.username} onSubmit={followUser} />
			</CardFooter>
		</Card>
	);
}
