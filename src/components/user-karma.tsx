'use client';

import { use } from 'react';
import { toast } from 'sonner';
import type { GetUserKarmaResult } from '@/app/discovery/actions';
import useRealtimeUpdates from '@/hooks/use-realtime-updates';
import { KarmaEvent } from '@/server/db/schema';
import { EventType } from '@/constants';

const handleKarmaNotificationEvent = (e: KarmaEvent) => {
	if (e.type === EventType.INCREASE) {
		toast.success('Followed successfully!', {
			description: 'You have received +1 karma point.',
		});
	}
	if (e.type === EventType.DECREASE) {
		toast.info('Someone has followed you!', {
			description: 'We have taken -1 karma point to you.',
		});
	}
};

export function UserKarma({
	getKarmaPromise,
}: {
	getKarmaPromise: Promise<GetUserKarmaResult>;
}) {
	// TODO: This request is performed without waiting for the user to be synced.
	// First time a user logs in, we request the karma but user is not on the database yet.
	const data = use(getKarmaPromise);

	useRealtimeUpdates<KarmaEvent>({
		channel: `userId:${data.userId}`,
		onUpdate: handleKarmaNotificationEvent,
	});

	return <div>karma</div>;
}
