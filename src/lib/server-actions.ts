'use server';

import { z } from 'zod';

type ServerActionSuccess<T> = { success: true; data: T };
type ServerActionFailure = { success: false; error: string };
type ServerActionResult<T> = ServerActionSuccess<T> | ServerActionFailure;

function logError(ctx: string, error: unknown): void {
	console.error(`[${ctx} ERROR]:`, error);
	console.trace(error);
}

function success<T>(data: T): ServerActionSuccess<T> {
	return { success: true, data };
}

function failure(error: unknown): ServerActionFailure {
	if (error instanceof z.ZodError) {
		logError('ZOD', error);
		return {
			success: false,
			error: 'Invalid input data',
		};
	}

	if (error instanceof Error) {
		logError('SERVER', error);
		return {
			success: false,
			error: error.message,
		};
	}

	logError('UNHANDLED', error);
	return {
		success: false,
		error: 'An unknown error occurred',
	};
}

export { success, failure };
export type { ServerActionResult };
