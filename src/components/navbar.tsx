import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs';

export function NavBar() {
	return (
		<header className="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-16 w-full gap-4 border-b backdrop-blur">
			<div className="container mx-auto flex h-16 w-full items-center justify-between p-4">
				<div className="text-xl font-bold">MeetDu</div>
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
