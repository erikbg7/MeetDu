import { Toaster } from 'sonner';

export default async function DiscoveryPage() {
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
		</main>
	);
}
