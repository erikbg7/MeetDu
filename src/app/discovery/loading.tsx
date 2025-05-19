import { cn } from '@/lib/utils';
import { DISCOVERY_CARDS_AMOUNT } from '@/constants';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const loadingClass = 'animate-pulse bg-neutral-100 rounded-md';

export default function Loading() {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{/* This are the user card placeholders */}
			{Array(DISCOVERY_CARDS_AMOUNT)
				.fill(1)
				.map((_, index) => (
					<Card
						key={index}
						className="flex h-full flex-col gap-0 overflow-hidden pt-0 transition-all hover:shadow-md"
					>
						<div className="relative flex flex-col items-center bg-gradient-to-b from-gray-50 to-white pt-8 pb-4">
							<div
								className={cn(
									loadingClass,
									'size-32 rounded-full border-4 border-transparent pb-4',
								)}
							/>
						</div>

						<CardContent className="flex h-40 flex-col items-center justify-between pb-4">
							<div className={cn(loadingClass, 'mb-3 h-12 w-full')} />
							<div className={cn(loadingClass, 'h-full w-full')} />
						</CardContent>

						<CardFooter className="mt-auto pt-0">
							<div className={cn(loadingClass, 'h-9 w-full')} />
						</CardFooter>
					</Card>
				))}
		</div>
	);
}
