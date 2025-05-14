import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<html lang="en">
			<body>
				<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
					<div className="w-full max-w-md space-y-6 text-center">
						<div>
							<h1 className="text-7xl font-extrabold tracking-tight text-gray-900 md:text-8xl">
								404
							</h1>
							<h2 className="text-3xl font-bold text-gray-700">
								Page Not Found
							</h2>
						</div>

						<div className="relative overflow-hidden rounded-lg shadow-xl">
							<img
								src="/confused-travolta.gif"
								alt="Confused John Travolta looking around"
								className="h-auto w-full"
							/>
							<div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
								<p className="w-full p-4 text-center text-lg font-semibold text-white">
									Me looking for the page you requested
								</p>
							</div>
						</div>

						<Button asChild className="w-full gap-2 sm:w-auto" size={'lg'}>
							<Link href="/">
								<Home className="h-4 w-4" />
								Back to Home
							</Link>
						</Button>
					</div>
				</div>
			</body>
		</html>
	);
}
