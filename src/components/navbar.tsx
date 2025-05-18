import { Suspense } from 'react';
import Image from 'next/image';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs';
import { getUserKarma } from '@/app/discovery/actions';
import { UserKarma } from '@/components/user-karma';

export function NavBar() {
	const getKarmaPromise = getUserKarma();
	return (
		<header className="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-16 w-full gap-4 border-b backdrop-blur">
			<div className="container mx-auto flex h-16 w-full items-center justify-between p-4">
				<div className="flex items-center text-xl font-bold">
					<Image src="/meetdu.png" alt="Logo" width={48} height={48} />
					<span>MeetDu</span>
				</div>
				<div>
					<Suspense fallback={<div>Loading...</div>}>
						<UserKarma getKarmaPromise={getKarmaPromise} />
					</Suspense>
					<SignedOut>
						<SignInButton />
						<SignUpButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</header>
	);
}
