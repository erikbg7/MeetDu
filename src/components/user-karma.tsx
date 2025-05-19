'use client';

import { use } from 'react';
import type { GetUserKarmaResult } from '@/app/discovery/actions';
import useRealtimeUpdates from '@/hooks/use-realtime-updates';
import { KarmaEvent } from '@/server/db/schema';

export function UserKarma({
	getKarmaPromise,
}: {
	getKarmaPromise: Promise<GetUserKarmaResult>;
}) {
	const data = use(getKarmaPromise);

	useRealtimeUpdates<KarmaEvent>({
		channel: `userId:${data.userId}`,
		onUpdate: (data) => console.log({ data }),
	});

	return <div>karma</div>;
}
