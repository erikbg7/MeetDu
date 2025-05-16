/* eslint-disable react/no-unescaped-entities */

import { CONTACT_URL } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terms and Conditions | MeetDu',
	description: 'Terms and conditions for using the MeetDu platform',
};

export default function TermsPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<div className="mx-auto max-w-3xl">
				<h1 className="mb-6 text-3xl font-bold">Terms and Conditions</h1>

				<div className="prose prose-slate max-w-none">
					<p className="text-muted-foreground mb-6">
						Last updated: May 16, 2025
					</p>

					<h2>1. Acceptance of Terms</h2>
					<p>
						By accessing or using MeetDu (the "Service"), you agree to be bound
						by these Terms and Conditions. If you disagree with any part of the
						terms, you may not access the Service.
					</p>

					<h2>2. Description of Service</h2>
					<p>
						MeetDu is a platform that allows users to connect with other GitHub
						users based on a karma system. Users can follow each other and gain
						karma points for following other users in the community.
					</p>

					<h2>3. GitHub Integration</h2>
					<p>
						Our Service integrates with GitHub through OAuth authentication. By
						using MeetDu, you authorize us to access certain GitHub information
						such as your public profile data. We handle this data in accordance
						with our Privacy Policy.
					</p>

					<h2>4. User Accounts</h2>
					<p>
						To use our Service, you must create an account using GitHub OAuth.
						You are responsible for maintaining the confidentiality of your
						account and for all activities that occur under your account. You
						agree to:
					</p>
					<ul>
						<li>
							Provide accurate and complete information when creating your
							account
						</li>
						<li>Update your information to keep it accurate and current</li>
						<li>
							Notify us immediately of any unauthorized use of your account
						</li>
						<li>
							Be responsible for all activities that occur under your account
						</li>
					</ul>
					<h2>4A. Communication and Related Services</h2>
					<p>
						By using MeetDu, you acknowledge and agree that you may receive
						communications from the author or operator of MeetDu regarding other
						related products or services operated by the same entity. These
						communications may include promotional content, product updates, and
						relevant announcements.
					</p>
					<p>
						You may opt out of such communications at any time by following the
						unsubscribe instructions in the message or by contacting us
						directly.
					</p>

					<h2>5. Karma System</h2>
					<p>MeetDu operates on a karma-based system where:</p>
					<ul>
						<li>Users gain karma points by following other users</li>
						<li>Users lose karma when they are followed by another user</li>
						<li>
							Karma points have no monetary value and cannot be exchanged for
							cash or other consideration
						</li>
						<li>We reserve the right to modify the karma system at any time</li>
					</ul>

					<h2>6. Acceptable Use</h2>
					<p>You agree not to use the Service to:</p>
					<ul>
						<li>Violate any laws or regulations</li>
						<li>Impersonate any person or entity</li>
						<li>Harass, abuse, or harm another person</li>
						<li>Send spam or other unsolicited messages</li>
						<li>Interfere with or disrupt the Service</li>
						<li>Attempt to gain unauthorized access to the Service</li>
					</ul>

					<h2>7. Intellectual Property</h2>
					<p>
						The Service and its original content, features, and functionality
						are owned by MeetDu and are protected by international copyright,
						trademark, patent, trade secret, and other intellectual property
						laws.
					</p>

					<h2>8. Termination</h2>
					<p>
						We may terminate or suspend your account immediately, without prior
						notice or liability, for any reason, including without limitation if
						you breach the Terms and Conditions.
					</p>

					<h2>9. Limitation of Liability</h2>
					<p>
						In no event shall MeetDu, nor its directors, employees, partners,
						agents, suppliers, or affiliates, be liable for any indirect,
						incidental, special, consequential or punitive damages, including
						without limitation, loss of profits, data, use, goodwill, or other
						intangible losses, resulting from:
					</p>
					<ul>
						<li>
							Your access to or use of or inability to access or use the Service
						</li>
						<li>Any conduct or content of any third party on the Service</li>
						<li>Any content obtained from the Service</li>
						<li>
							Unauthorized access, use or alteration of your transmissions or
							content
						</li>
					</ul>

					<h2>10. Changes to Terms</h2>
					<p>
						We reserve the right, at our sole discretion, to modify or replace
						these Terms at any time. If a revision is material we will try to
						provide at least 30 days' notice prior to any new terms taking
						effect. Your continued use of the Service after any changes
						constitutes your acceptance of the new Terms.
					</p>

					<h2>11. Contact Us</h2>
					<p>
						If you have any questions about these Terms, please{' '}
						<a href={CONTACT_URL} className="text-primary hover:underline">
							contact us
						</a>
						.
					</p>
					<h2>12. Consent at Registration</h2>
					<p>
						By creating an account on MeetDu, you confirm that you have read and
						accepted our Terms and Conditions and Privacy Policy.
					</p>
					<p>
						You also acknowledge that you may be asked for additional consent
						regarding how we use your personal data, such as for receiving
						emails or marketing communications.
					</p>
					<h2>13. Governing Law</h2>
					<p>
						These Terms and any dispute arising out of or in connection with
						them shall be governed by and construed in accordance with the laws
						of Spain, without regard to its conflict of law provisions.
					</p>
					<h2>14. No Affiliation</h2>
					<p>
						MeetDu is an independent platform and is not affiliated with or
						endorsed by GitHub, Discord, or any other third-party service
						integrated into our platform.
					</p>
				</div>
			</div>
		</main>
	);
}
