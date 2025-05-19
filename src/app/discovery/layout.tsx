import { Toaster } from 'sonner';
import { Zap } from 'lucide-react';

type Props = {
	children: React.ReactNode;
};

export default function DiscoveryLayout({ children }: Props) {
	return (
		<main className="container mx-auto px-12 py-8">
			<Toaster
				expand={true}
				position="top-right"
				offset={{ top: 75 }}
				mobileOffset={{ top: 75 }}
				icons={{ info: <Zap /> }}
			/>
			<div className="mb-8">
				<h1 className="mb-2 text-3xl font-bold">Discover Users</h1>
				<p className="text-muted-foreground">
					Connect with these GitHub users to increase your karma and expand your
					network
				</p>
			</div>

			{children}
		</main>
	);
}
