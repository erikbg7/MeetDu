import { seed } from 'drizzle-seed';
import { db } from '@/server/db';
import { profile } from '@/server/db/schema';

export async function seedDatabase() {
	console.log('Seeding database...');
	await seed(db, { profile });
}
