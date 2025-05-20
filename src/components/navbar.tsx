import { Suspense } from 'react';
import Image from 'next/image';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { getUserKarma } from '@/app/discovery/actions';
import { UserKarma } from '@/components/user-karma';
import ConnectButton from '@/components/connect-button';

export function NavBar() {
	return (
		<header className="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-16 w-full gap-4 border-b backdrop-blur">
			<div className="container mx-auto flex h-16 w-full items-center justify-between py-4">
				<div className="flex items-center text-xl font-bold">
					<Image src="/meetdu.webp" alt="Logo" width={52} height={52} />
					<span className="text-2xl">MeetDu</span>
				</div>
				<div className="flex items-center gap-2">
					<SignedOut>
						<ConnectButton />
					</SignedOut>
					<SignedIn>
						<Suspense>
							<UserKarma getKarmaPromise={getUserKarma()} />
						</Suspense>
					</SignedIn>
				</div>
			</div>
		</header>
	);
}
