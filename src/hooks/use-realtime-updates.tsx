'use client';

import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL)
	throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
	throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

await supabase.realtime.setAuth(); // Needed for Realtime Authorization

type RealtimeUpdatesParams<T> = {
	channel: string;
	onUpdate: (data: T) => void;
};

type RealtimePayload<T> = {
	payload: {
		id: string;
		schema: string;
		table: string;
		record: T;
	};
};

export default function useRealtimeUpdates<T>({
	channel,
	onUpdate,
}: RealtimeUpdatesParams<T>) {
	useEffect(() => {
		console.log('Connecting to Supabase Realtime...');

		if (!channel) return;
		if (!channel.split(':')[1]) return;

		// Subscribe to the channel
		const realtimeChannel = supabase
			.channel(channel, { config: { private: true } })
			.on('broadcast', { event: 'INSERT' }, ({ payload }: RealtimePayload<T>) =>
				onUpdate(payload.record),
			)
			.subscribe();

		return () => {
			// Unsubscribe from the channel
			supabase.removeChannel(realtimeChannel);
		};
	}, [channel]);

	return null; // Or return UI elements as needed
}
