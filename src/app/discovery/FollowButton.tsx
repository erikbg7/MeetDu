'use client';

import { toast } from 'sonner';
import { Check, Loader } from 'lucide-react';
import { startTransition, useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Profile } from '@/server/db/schema';
import type { FollowUserAction } from '@/app/discovery/actions';

type Props = {
	username: Profile['username'];
	onSubmit: FollowUserAction;
};

export function FollowButton({ username, onSubmit }: Props) {
	const [isFollowing, setIsFollowing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = () => {
		if (isLoading || isFollowing) return;
		setIsLoading(true);
		startTransition(() => {
			onSubmit(username)
				.then((res) => {
					if (res.success) {
						setIsFollowing(true);
						toast.success('Followed successfully');
						setIsLoading(false);
					} else {
						toast.error(res.error);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.error('[UNHANDLED ACTION ERROR]:', err);
					console.log({ err });
					if (err instanceof Error) {
						console.error('[UNHANDLED ACTION ERROR]:', err.message);
						toast.error(err.message);
						setIsLoading(false);
					}
				});
		});
	};

	return (
		<div className="relative flex w-full justify-center">
			<Button
				onClick={handleClick}
				disabled={isLoading}
				className={cn(
					'transition-all duration-300 ease-in-out',
					isFollowing ? 'w-10 px-0' : 'w-full',
				)}
			>
				{isLoading && <Loader className="animate-spin" size={16} />}
				{isFollowing && <Check size={16} />}
				{!isFollowing && !isLoading && (
					<span className="text-sm font-semibold">Follow</span>
				)}
			</Button>
		</div>
	);
}
