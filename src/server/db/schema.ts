import { getTableColumns } from 'drizzle-orm';
import {
	pgTable,
	text,
	timestamp,
	integer,
	index,
	serial,
	pgEnum,
} from 'drizzle-orm/pg-core';

const profile = pgTable(
	'profile',
	{
		id: text('id').primaryKey().notNull(), // this is the clerk id
		name: text('name').notNull(),
		githubId: integer('github_id').notNull(),
		username: text('username').unique().notNull(),
		url: text('url').notNull(),
		location: text('location').notNull(),
		bio: text('bio').notNull(),
		avatar: text('avatar'),
		karma: integer('karma').notNull().default(0),
		repos: integer('repos').notNull().default(0),

		createdAt: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [index('karma_idx').on(table.karma.desc())],
);

export const eventTypeEnum = pgEnum('event_type', ['increase', 'decrease']);

export const karmaEvent = pgTable('karma_event', {
	id: serial('id').primaryKey().notNull(),
	userId: text('user_id').notNull(), // this is the users clerk id
	type: eventTypeEnum('type').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
});

// TODO: either make this safe by default or just expose the full columns
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { id, createdAt, ...publicProfileColumns } = getTableColumns(profile);

export type Profile = typeof profile.$inferSelect;
export type ProfileInsert = typeof profile.$inferInsert;
export type ProfileUpdate = Partial<typeof profile.$inferInsert>;
export type PublicProfile = Omit<Profile, 'id' | 'createdAt' | 'internalId'>;
export type KarmaEvent = typeof karmaEvent.$inferSelect;

export { profile, publicProfileColumns };
