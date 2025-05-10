import { pgTable, text, timestamp, integer, index } from 'drizzle-orm/pg-core';

export const profile = pgTable(
	'profile',
	{
		id: integer('id').primaryKey().notNull(),
		name: text('name').notNull(),
		username: text('username').unique().notNull(),
		url: text('url').notNull(),
		location: text('location').notNull(),
		bio: text('bio').notNull(),
		avatar: text('avatar'),
		karma: integer('karma').notNull(),

		createdAt: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [index('karma_idx').on(table.karma.desc())],
);
