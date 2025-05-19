'use client';

import { use, useState } from 'react';
import { toast } from 'sonner';
import { Zap } from 'lucide-react';
import type { GetUserKarmaResult } from '@/app/discovery/actions';
import useRealtimeUpdates from '@/hooks/use-realtime-updates';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { KarmaEvent } from '@/server/db/schema';
import { EventType } from '@/constants';




export function UserKarma({
	getKarmaPromise,
}: {
	getKarmaPromise: Promise<GetUserKarmaResult>;
}) {
	// TODO: This request is performed without waiting for the user to be synced.
	// First time a user logs in, we request the karma but user is not on the database yet.
	const data = use(getKarmaPromise);
	const [karma, setKarma] = useState(data.karma);
	const isAnimating = false;
	// const [isAnimating, setIsAnimating] = useState(false);

	const handleKarmaNotificationEvent = (e: KarmaEvent) => {
		if (e.type === EventType.INCREASE) {
			setKarma((prev) => prev + 1);
			toast.success('Followed successfully!', {
				description: 'You have received +1 karma point.',
			});
		}
		if (e.type === EventType.DECREASE) {
			setKarma((prev) => prev - 1);
			toast.info('Someone has followed you!', {
				description: 'We have taken -1 karma point to you.',
			});
		}
	};

	useRealtimeUpdates<KarmaEvent>({
		channel: `userId:${data.userId}`,
		onUpdate: handleKarmaNotificationEvent,
	});

	return (
		<div>
			<div className="relative">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							{/* <button
								onClick={handleNotificationClick}
								className={`flex cursor-pointer items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 shadow-sm transition-all ${isAnimating ? 'scale-110' : ''}`}
								> */}
							<div
								className={`flex cursor-pointer items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 shadow-sm transition-all ${isAnimating ? 'scale-110' : ''}`}
							>
								<Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
								<span
									className={`font-bold text-amber-600 transition-all ${isAnimating ? 'text-green-600' : ''}`}
								>
									{karma}
								</span>
							</div>
							{/* </button> */}
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<div className="text-sm">
								<p className="font-semibold">Your Karma: {karma}</p>
								<p className="text-muted-foreground mt-1 text-xs">
									Gain karma when other users follow you
								</p>
							</div>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				{/* Notification Badge
				{notifications > 0 && (
					<Badge
						className="absolute -top-2 -right-2 flex h-5 min-w-5 animate-pulse items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white"
						aria-label={`${notifications} new followers`}
					>
						{notifications}
					</Badge>
				)} */}
			</div>
		</div>
	);
}
