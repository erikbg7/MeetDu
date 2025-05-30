import React from 'react';
import { MapPin, GitFork, Zap } from 'lucide-react';
import { PublicProfile } from '@/server/db/schema';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
	user: PublicProfile;
	children?: React.ReactNode;
};

export default function UserCard({ user, children }: Props) {
	return (
		<a
			href={user.url}
			target="_blank"
			rel="noopener noreferrer"
			className="focus-visible:ring-primary block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
		>
			<Card className="group border-primary/10 hover:border-primary/30 flex h-full cursor-pointer flex-col gap-0 overflow-hidden pt-0 transition-all hover:shadow-md">
				<div className="relative flex flex-col items-center bg-gradient-to-b from-gray-50 to-white pt-8 pb-4">
					<Avatar className="animate-fade-in h-32 w-32 rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-105">
						<AvatarImage
							src={user.avatar || '/placeholder.svg?height=128&width=128'}
							alt={user.username}
							className="object-cover"
						/>
						<AvatarFallback className="text-3xl">
							{user.username.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<div className="animate-fade-in absolute top-6 right-6">
						<Badge
							variant="outline"
							className="flex items-center gap-1 border-amber-200 bg-white px-3 py-1.5 text-amber-600 shadow-sm"
						>
							<Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
							<span className="font-semibold">{user.karma}</span>
						</Badge>
					</div>
				</div>

				<CardContent className="animate-fade-in flex h-40 flex-col items-center justify-between">
					<div className="text-center">
						<h3 className="mb-0.5 line-clamp-1 text-xl font-bold">
							{user.name}
						</h3>
						<p className="text-muted-foreground mb-3 flex justify-center text-sm">
							@{user.username}
						</p>

						{user.bio && (
							<p className="mx-auto mb-4 line-clamp-2 max-w-xs text-sm">
								{user.bio}
							</p>
						)}
					</div>

					<div className="animate-fade-in mb-4 flex justify-center gap-3">
						{user.location && (
							<Badge variant="secondary" className="flex items-center gap-1">
								<MapPin className="h-3.5 w-3.5" />
								{user.location}
							</Badge>
						)}

						<Badge variant="secondary" className="flex items-center gap-1">
							<GitFork className="h-3.5 w-3.5" />
							{user.repos} repos
						</Badge>
					</div>
				</CardContent>

				<CardFooter className="mt-auto pt-0">
					<React.Suspense>{children}</React.Suspense>
				</CardFooter>
			</Card>
		</a>
	);
}
