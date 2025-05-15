import { toast } from 'sonner';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function handleClientSideError(error: unknown): void {
	if (error instanceof Error) {
		console.error('[CLIENT ERROR]:', error.message);
		toast.error(error.message);
		return;
	}

	toast.error('An unknown error occurred');
}
