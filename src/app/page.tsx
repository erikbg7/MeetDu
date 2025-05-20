/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Github, Users, Zap, Database, Bell } from 'lucide-react';
import ConnectButton from '@/components/connect-button';
import ToastSequence from '@/components/toast-sequence';

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Suspense>
				<ToastSequence />
			</Suspense>
			{/* HERO SECTION */}
			<section className="overflow-hidden bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
				<div className="container px-4 md:px-16">
					<div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
						<div className="flex max-w-lg flex-col space-y-4 md:space-y-6">
							<div className="space-y-2">
								<h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
									Our community is stronger together
									<span className="text-amber-500">⚡</span>
								</h1>
							</div>
							<p className="text-muted-foreground">
								A mini-game designed to strengthen our community bonds and help
								us grow together on GitHub. Follow others, earn karma, and get
								discovered!
							</p>
							<div className="flex flex-col gap-4 sm:flex-row">
								<ConnectButton />
							</div>
						</div>
						<div className="flex justify-center md:justify-end">
							<div className="relative h-[300px] w-full max-w-md md:h-[400px] md:max-w-none lg:h-[500px]">
								<Image
									src="/meetdu-hero.webp"
									alt="Developers connecting through MeetDu"
									fill
									priority
									className="object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* HOW IT WORKS SECTION */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<Badge variant="outline" className="px-3 py-1 text-sm">
							How It Works
						</Badge>
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
							A mini-game to strengthen our community
						</h2>
						<p className="text-muted-foreground max-w-[700px] md:text-lg">
							MeetDu is an experiment designed to help us grow together on
							GitHub and strengthen the bonds between developers.
						</p>
					</div>

					<div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
						<div className="flex flex-col items-center rounded-lg border bg-white p-6 text-center shadow-sm">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
								<Zap className="h-6 w-6 text-green-600" />
							</div>
							<h3 className="mb-2 text-xl font-bold">Earn Karma</h3>
							<p className="text-muted-foreground">
								Every time you follow a community member, you'll earn Karma
								points. The more Karma you have, the more visible you'll be!
							</p>
						</div>

						<div className="flex flex-col items-center rounded-lg border bg-white p-6 text-center shadow-sm">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
								<Users className="h-6 w-6 text-amber-600" />
							</div>
							<h3 className="mb-2 text-xl font-bold">Connect with Others</h3>
							<p className="text-muted-foreground">
								The app shows you the 8 users with the most Karma. When someone
								follows you, you lose Karma, creating a dynamic balance.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FEATURES SECTION */}
			<section className="bg-gray-50 py-16 md:py-24">
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<Badge variant="outline" className="px-3 py-1 text-sm">
							Features
						</Badge>
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
							Everything You Need
						</h2>
						<p className="text-muted-foreground max-w-[700px] md:text-lg">
							MeetDu integrates modern technologies to provide a smooth and fun
							experience.
						</p>
					</div>

					<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<div className="flex flex-col items-center p-4 text-center">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
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
									className="h-6 w-6 text-blue-600"
								>
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
								</svg>
							</div>
							<h3 className="mb-2 text-lg font-bold">Secure Authentication</h3>
							<p className="text-muted-foreground text-sm">
								Authentication and user management system using Clerk.
							</p>
						</div>

						<div className="flex flex-col items-center p-4 text-center">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
								<Github className="h-6 w-6 text-purple-600" />
							</div>
							<h3 className="mb-2 text-lg font-bold">GitHub Integration</h3>
							<p className="text-muted-foreground text-sm">
								Easily discover and follow other developers in the community.
							</p>
						</div>

						<div className="flex flex-col items-center p-4 text-center">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
								<Database className="h-6 w-6 text-green-600" />
							</div>
							<h3 className="mb-2 text-lg font-bold">PostgreSQL Database</h3>
							<p className="text-muted-foreground text-sm">
								Secure storage of public information and user karma.
							</p>
						</div>

						<div className="flex flex-col items-center p-4 text-center">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
								<Bell className="h-6 w-6 text-red-600" />
							</div>
							<h3 className="mb-2 text-lg font-bold">
								Real-Time Notifications
							</h3>
							<p className="text-muted-foreground text-sm">
								Stay updated about your followers and activity with Supabase.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* BANNER SECTION */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-4 md:px-6">
					<div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center md:space-y-6">
						<h2 className="text-4xl font-bold tracking-tighter md:text-4xl">
							Join the community <span className="text-amber-500">⚡</span>
						</h2>
						<p className="text-muted-foreground md:text-lg">
							Strengthen the bonds between developers and help us grow together
							on GitHub.
						</p>
						<ConnectButton>
							<span className="flex items-center gap-2">
								Discover Developers
								<ArrowRight className="h-4 w-4" />
							</span>
						</ConnectButton>
					</div>
				</div>
			</section>
		</div>
	);
}
