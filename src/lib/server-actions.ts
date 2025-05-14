'use server';

import { z } from 'zod';

type ServerActionSuccess<T> = { success: true; data: T };
type ServerActionFailure = { success: false; error: string };
type ServerActionResult<T> = ServerActionSuccess<T> | ServerActionFailure;

function success<T>(data: T): ServerActionSuccess<T> {
	return { success: true, data };
}

function failure(error: unknown): ServerActionFailure {
	let message = 'An unknown error occurred';

	if (error instanceof z.ZodError) {
		console.error('[ZOD ERROR]:', error.errors);
		message = error.errors.map((e) => e.message).join(', ');
	}

	if (error instanceof Error) {
		console.error('[ACTION ERROR]:', error.message);
		console.trace(error);
		message = error.message;
	}

	return {
		success: false,
		error: message,
	};
}

export { success, failure };
export type { ServerActionResult };
