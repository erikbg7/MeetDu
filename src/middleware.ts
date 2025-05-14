import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { AppRoute } from '@/constants';

const isPublicRoute = createRouteMatcher([
	AppRoute.HOME,
	AppRoute.SIGN_IN.concat('(.*)'),
	AppRoute.SIGN_UP.concat('(.*)'),
]);

export default clerkMiddleware(async (auth, req) => {
	const { userId } = await auth();
	if (!isPublicRoute(req)) {
		if (!userId) {
			await auth.protect();
		}
	}

	if (!!userId && req.nextUrl.pathname === AppRoute.HOME) {
		return NextResponse.redirect(new URL(AppRoute.DISCOVERY, req.url));
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
