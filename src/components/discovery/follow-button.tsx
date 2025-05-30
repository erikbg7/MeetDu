'use client';

import { Check, Loader } from 'lucide-react';
import { useState, useTransition } from 'react';
import { track } from '@vercel/analytics';

import { cn, handleClientSideError } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Profile } from '@/server/db/schema';
import type { FollowUserAction } from '@/app/discovery/actions';

type Props = {
	username: Profile['username'];
	onSubmit: FollowUserAction;
};

export default function FollowButton({ username, onSubmit }: Props) {
	const [isPending, startTransition] = useTransition();
	const [isFollowing, setIsFollowing] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		track('follow_user');

		e.preventDefault();

		if (isPending || isFollowing) return;

		const form = e.currentTarget as HTMLFormElement;
		const submitter = (e.nativeEvent as SubmitEvent).submitter;
		const formData = new FormData(form, submitter);

		startTransition(() => {
			onSubmit(formData)
				.then((res) => {
					if (res.success) {
						setIsFollowing(true);
						track('follow_user:success');
					} else {
						throw new Error(res.error);
					}
				})
				.catch(handleClientSideError);
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="relative flex w-full justify-center"
			aria-disabled={isPending}
			aria-busy={isPending}
			aria-label="Follow user"
			aria-live="polite"
		>
			<Button
				name="username"
				value={username}
				disabled={isPending || isFollowing}
				aria-disabled={isPending || isFollowing}
				aria-busy={isPending}
				aria-label="Follow user"
				aria-live="polite"
				className={cn(
					'transition-all duration-300 ease-in-out',
					isFollowing ? 'w-10 px-0' : 'w-full',
				)}
			>
				{isPending && <Loader className="animate-spin" size={16} />}
				{isFollowing && <Check size={16} />}
				{!isFollowing && !isPending && (
					<span className="flex items-center gap-2 text-sm font-semibold">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
							<path d="M9 18c-4.51 2-5-2-7-2" />
						</svg>
						Follow
					</span>
				)}
			</Button>
		</form>
	);
}
