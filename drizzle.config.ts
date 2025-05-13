import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

console.log('DATABASE_URL', process.env.DIRECT_DATABASE_URL);

if (!process.env.DIRECT_DATABASE_URL)
	throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/server/db/schema.ts',

	dbCredentials: {
		url: process.env.DIRECT_DATABASE_URL,
	},

	verbose: true,
	strict: true,
	dialect: 'postgresql',
});
