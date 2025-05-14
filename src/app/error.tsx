'use client';

import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

export default function Error({ error }: { error: Error }) {
	useEffect(() => {
		console.error('App error:', error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
					<div className="w-full max-w-md space-y-6 text-center">
						<div>
							<h1 className="text-7xl font-extrabold tracking-tight md:text-8xl">
								500
							</h1>
							<h2 className="text-3xl font-bold text-gray-700">
								Something wrong
							</h2>
						</div>

						<div className="relative overflow-hidden rounded-lg shadow-xl">
							<img
								src="/this-is-fine.gif"
								alt="This is fine meme with burning room"
								className="h-auto w-full"
							/>
							<div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 via-black/20 to-transparent">
								<p className="w-full p-4 text-center text-lg font-semibold text-white">
									No worries... this is totally planned.
								</p>
							</div>
						</div>

						<a
							href="https://github.com/erikbg7/meetdu/issues"
							className="flex items-center justify-center gap-1 text-sm underline"
						>
							Are you able to reproduce this issue?
							<ExternalLink className="inline h-4 w-4" />
						</a>
					</div>
				</div>
			</body>
		</html>
	);
}
