'use client';

import { use, useState } from 'react';
import { toast } from 'sonner';
import { Zap } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
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

type Props = {
	getKarmaPromise: Promise<GetUserKarmaResult>;
};

export function UserKarma({ getKarmaPromise }: Props) {
	// TODO: This request is performed without waiting for the user to be synced.
	// First time a user logs in, we request the karma but user is not on the database yet.
	const data = use(getKarmaPromise);
	const { user } = useUser();

	const [karma, setKarma] = useState(data.karma);
	const isAnimating = false;
	// const [isAnimating, setIsAnimating] = useState(false);

	const handleKarmaNotificationEvent = (e: KarmaEvent) => {
		console.log('Karma event received:', e);
		if (e.type === EventType.INCREASE) {
			setKarma((prev) => prev + 1);
			toast.info('Followed successfully!', {
				description: 'You have received +1 karma point.',
			});
		}
		if (e.type === EventType.DECREASE) {
			setKarma((prev) => prev - 1);
			toast.info('Someone has followed you!', {
				description: 'We have taken -1 karma point from you.',
			});
		}
	};

	useRealtimeUpdates<KarmaEvent>({
		channel: `userId:${data.userId}`,
		onUpdate: handleKarmaNotificationEvent,
	});

	if (!data.userId || !user) return null;

	return (
		<div>
			<div className="relative">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div
								className={`flex cursor-pointer items-center gap-2 rounded-full border bg-white px-3 py-1.5 shadow-sm transition-all ${isAnimating ? 'scale-110' : ''}`}
							>
								<span
									className={`flex items-center font-bold text-amber-600 transition-all ${isAnimating ? 'text-green-600' : ''}`}
								>
									<Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
									{karma}
								</span>
								<UserButton />
							</div>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<div className="text-sm">
								<p className="font-semibold">Your Karma: {karma}</p>
								<p className="text-muted-foreground mt-1 text-xs">
									1. You gain karma when you follow a user.
								</p>
								<p className="text-muted-foreground mt-1 text-xs">
									2. You lose karma when a users follows you.
								</p>
								<p className="text-muted-foreground mt-1 text-xs">
									3. The more karma, the more users will see your profile.
								</p>
							</div>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
