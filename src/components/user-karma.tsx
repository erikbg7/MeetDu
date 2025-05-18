'use client';

import { use } from 'react';
import type { GetUserKarmaResult } from '@/app/discovery/actions';
import useRealtimeUpdates from '@/hooks/use-realtime-updates';

export function UserKarma({
	getKarmaPromise,
}: {
	getKarmaPromise: Promise<GetUserKarmaResult>;
}) {
	const data = use(getKarmaPromise);

	useRealtimeUpdates<any>({
		channel: `topic:${data.userId}`,
		onUpdate: (data) => console.log({ data }),
	});

	return <div>karma</div>;
}
