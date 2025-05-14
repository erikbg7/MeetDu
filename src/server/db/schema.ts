import { getTableColumns } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, index } from 'drizzle-orm/pg-core';

const profile = pgTable(
	'profile',
	{
		id: text('id').primaryKey().notNull(),
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

// eslint-disable-next-line
const { id, createdAt, ...publicProfileColumns } = getTableColumns(profile);

export type Profile = typeof profile.$inferSelect;
export type ProfileInsert = typeof profile.$inferInsert;
export type ProfileUpdate = Partial<typeof profile.$inferInsert>;
export type PublicProfile = Omit<Profile, 'id' | 'createdAt'>;

export { profile, publicProfileColumns };
