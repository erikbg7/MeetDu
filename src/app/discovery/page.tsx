import { Suspense } from 'react';
import { Toaster } from 'sonner';
import {
	followUser,
	getTopUsers,
	syncUserOnFirstLogin,
} from '@/app/discovery/actions';

import UsersGrid from '@/app/discovery/UsersGrid';

async function DiscoveryContent() {
	await syncUserOnFirstLogin();

	return (
		<main className="container mx-auto px-4 py-8">
			<Toaster />
			<div className="mb-8">
				<h1 className="mb-2 text-3xl font-bold">Discover Users</h1>
				<p className="text-muted-foreground">
					Connect with these GitHub users to increase your karma and expand your
					network
				</p>
			</div>
			<Suspense fallback={<p>Loading profiles...</p>}>
				<UsersGrid loadUsers={getTopUsers} followUser={followUser} />
			</Suspense>
		</main>
	);
}

export default async function DiscoveryPage() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<DiscoveryContent />
		</Suspense>
	);
}
