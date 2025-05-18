import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs';
import Image from 'next/image';

export function NavBar() {
	return (
		<header className="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-16 w-full gap-4 border-b backdrop-blur">
			<div className="container mx-auto flex h-16 w-full items-center justify-between p-4">
				<div className="flex items-center text-xl font-bold">
					<Image src="/meetdu.png" alt="Logo" width={48} height={48} />
					<span>MeetDu</span>
				</div>
				<div>
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
