'use client';

import { Button } from '@/components/ui/button';
import { GET_TOP_USERS_ERROR, SYNC_USER_ERROR } from '@/lib/errors';

type Props = { error: Error; reset: () => void };

const retryMessages = {
	[SYNC_USER_ERROR]:
		"We couldn't sync your GitHub account. Please try again later.",
	[GET_TOP_USERS_ERROR]: "We couldn't load the users. Please try again later.",
};

export default function DiscoveryError({ error, reset }: Props) {
	if (error.name === SYNC_USER_ERROR || error.name === GET_TOP_USERS_ERROR) {
		const message = retryMessages[error.name] || 'Retry';

		return (
			<div className="flex min-h-[50vh] w-auto flex-col items-center justify-center rounded-2xl bg-gray-500/10 p-6 text-center">
				<h2 className="mb-3 text-4xl font-bold">Oops!</h2>

				<p className="text-muted-foreground mb-6 max-w-xs px-6">{message}</p>

				<Button onClick={reset} size="lg" className="px-8">
					Retry
				</Button>
			</div>
		);
	} else {
		throw error;
	}
}
