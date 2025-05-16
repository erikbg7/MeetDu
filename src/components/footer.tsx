import Link from 'next/link';
import { AppRoute, CONTACT_URL, ISSUES_URL } from '@/constants';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col items-center justify-between md:flex-row">
					<div className="mb-4 md:mb-0">
						<p className="text-muted-foreground text-sm">
							© {currentYear} MeetDu. All rights reserved.
						</p>
					</div>

					<nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
						<a
							href={ISSUES_URL}
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							Issues
						</a>
						<Link
							href={AppRoute.TERMS}
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							Terms & Conditions
						</Link>
						<Link
							href={AppRoute.PRIVACY}
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							Privacy Policy
						</Link>
						<a
							href={CONTACT_URL}
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							Contact
						</a>
					</nav>
				</div>
			</div>
		</footer>
	);
}
