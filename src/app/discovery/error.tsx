'use client';

import { GET_TOP_USERS_ERROR, SYNC_USER_ERROR } from '@/lib/errors';

type Props = { error: Error; reset: () => void };

const retryMessages = {
	[SYNC_USER_ERROR]: 'Retry syncing user data',
	[GET_TOP_USERS_ERROR]: 'Retry fetching top users',
};

export default function DiscoveryError({ error, reset }: Props) {
	if (error.name === SYNC_USER_ERROR || error.name === GET_TOP_USERS_ERROR) {
		const message = retryMessages[error.name] || 'Retry';

		return (
			<div className="container mx-auto px-12 py-8">
				<h1 className="mb-2 text-3xl font-bold">Error</h1>
				<p className="text-muted-foreground">{error.message}</p>
				<button
					onClick={reset}
					className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
				>
					{message}
				</button>
			</div>
		);
	} else {
		throw error;
	}
}
