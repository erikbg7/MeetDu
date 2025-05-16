/* eslint-disable react/no-unescaped-entities */

import { CONTACT_URL } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy | MeetDu',
	description: 'Privacy policy for the MeetDu platform',
};

export default function PrivacyPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<div className="mx-auto max-w-3xl">
				<h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

				<div className="prose prose-slate max-w-none">
					<p className="text-muted-foreground mb-6">
						Last updated: May 16, 2025
					</p>

					<h2>1. Introduction</h2>
					<p>
						MeetDu ("we", "our", or "us") is committed to protecting your
						privacy. This Privacy Policy explains how we collect, use, disclose,
						and safeguard your information when you use our service.
					</p>
					<p>
						Please read this Privacy Policy carefully. By accessing or using
						MeetDu, you acknowledge that you have read, understood, and agree to
						be bound by all the terms of this Privacy Policy.
					</p>

					<h2>2. Information We Collect</h2>
					<p>We collect information when you register and use our platform:</p>
					<h3>2.1 Information from GitHub</h3>
					<p>When you authenticate with GitHub, we collect:</p>
					<ul>
						<li>Your GitHub username and ID</li>
						<li>Your name (if available)</li>
						<li>Your avatar/profile picture</li>
						<li>Your public GitHub profile information</li>
						<li>Your email address</li>
						<li>Your location (if available)</li>
						<li>Your bio (if available)</li>
						<li>Number of public repositories</li>
					</ul>

					<h3>2.2 Information You Provide</h3>
					<p>
						We may collect additional information you provide when using our
						service, such as:
					</p>
					<ul>
						<li>Information in your user profile</li>
						<li>Content you post or share</li>
						<li>Communications with other users</li>
					</ul>

					<h3>2.3 Usage Information</h3>
					<p>
						We automatically collect certain information about your device and
						how you interact with our service:
					</p>
					<ul>
						<li>IP address</li>
						<li>Device information</li>
						<li>Browser type and version</li>
						<li>Operating system</li>
						<li>Referring website</li>
						<li>Pages you view</li>
						<li>Time and date of your visits</li>
						<li>Other statistics</li>
					</ul>

					<h2>3. How We Use Your Information</h2>
					<p>We use the information we collect to:</p>
					<ul>
						<li>Provide, maintain, and improve our services</li>
						<li>Process and complete transactions</li>
						<li>Send you technical notices and support messages</li>
						<li>Respond to your comments and questions</li>
						<li>Develop and promote new products and services</li>
						<li>Generate anonymized, aggregate statistics about our users</li>
						<li>
							Protect against, identify, and prevent fraud and other illegal
							activity
						</li>
						<li>
							Use your data across our own platforms to offer integrated
							features and communications about our related services
						</li>
						<li>
							Send you promotional updates about services we believe may be
							relevant to you, provided they are under our ownership
						</li>

						<li>Comply with our legal obligations</li>
					</ul>

					<h2>4. How We Share Your Information</h2>
					<p>We may share your information in the following situations:</p>
					<ul>
						<li>
							<strong>With Other Users:</strong> Your profile information and
							activity are visible to other users of the service.
						</li>
						<li>
							<strong>Service Providers:</strong> We may share your information
							with third-party vendors who provide services on our behalf.
						</li>
						<li>
							<strong>Legal Requirements:</strong> We may disclose your
							information if required to do so by law or in response to valid
							requests by public authorities.
						</li>
						<li>
							<strong>Related Services:</strong> We may use your information
							across other digital products or services that we operate under
							the same ownership. For example, if you are a user of MeetDu, we
							may inform you about another related service we offer, using the
							contact details you provided. You can opt out of such
							communications at any time.
						</li>
						<li>
							<strong>Business Transfers:</strong> We may share or transfer your
							information in connection with a merger, acquisition,
							reorganization, or sale of assets.
						</li>
						<li>
							<strong>With Your Consent:</strong> We may share your information
							for other purposes with your consent.
						</li>
					</ul>

					<h2>5. Data Security</h2>
					<p>
						We implement appropriate technical and organizational measures to
						protect your personal information. However, no method of
						transmission over the Internet or electronic storage is 100% secure,
						and we cannot guarantee absolute security.
					</p>

					<h2>6. Your Rights</h2>
					<p>
						Depending on your location, you may have certain rights regarding
						your personal information:
					</p>
					<ul>
						<li>Access and receive a copy of your data</li>
						<li>Rectify or update your data</li>
						<li>Request deletion of your data</li>
						<li>Restrict or object to processing of your data</li>
						<li>Data portability</li>
					</ul>
					<p>
						To exercise these rights, please contact us using the information
						provided in the "Contact Us" section.
					</p>

					<h2>7. Children's Privacy</h2>
					<p>
						Our service is not intended for individuals under the age of 13. We
						do not knowingly collect personal information from children under
						13. If we learn we have collected personal information from a child
						under 13, we will delete that information.
					</p>

					<h2>8. Changes to This Privacy Policy</h2>
					<p>
						We may update our Privacy Policy from time to time. We will notify
						you of any changes by posting the new Privacy Policy on this page
						and updating the "Last updated" date.
					</p>

					<h2>9. Contact Us</h2>
					<p>
						If you have any questions about this Privacy Policy, please{' '}
						<a href={CONTACT_URL} className="text-primary hover:underline">
							contact us
						</a>
						.
					</p>
					<p>
						If you are located in the European Economic Area (EEA), you also
						have the right to lodge a complaint with your local data protection
						authority.
					</p>

					<h2>10. Legal Basis for Processing (GDPR)</h2>
					<p>
						As required by the General Data Protection Regulation (GDPR), we
						rely on the following lawful bases to process your personal data:
					</p>
					<ul>
						<li>
							<strong>Consent:</strong> When you explicitly agree to our use of
							your data, such as for newsletters or promotional emails.
						</li>
						<li>
							<strong>Contract:</strong> When processing is necessary to fulfill
							a contract with you (e.g., providing access to the service).
						</li>
						<li>
							<strong>Legitimate Interests:</strong> We may process your data
							when it is reasonably necessary for our legitimate interests, such
							as improving our services, preventing fraud, or informing you
							about related services we own. You have the right to object to
							this processing.
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}
