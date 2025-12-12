import { pgTable, text, varchar, jsonb, pgEnum, uuid, timestamp } from 'drizzle-orm/pg-core';

export const currentStatusEnum = pgEnum('current_status', [
  'development',
  'completed',
  'planning',
  'paused',
  'deprecated',
]);

export const futureStatusEnum = pgEnum('future_status', [
  'maintained',
  'unmaintained',
  'community',
  'archived',
  'none',
]);

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  logo: text('logo'),
  currentStatus: currentStatusEnum('current_status').notNull().default('planning'),
  futureStatus: futureStatusEnum('future_status').notNull().default('none'),
  imageSrc: text('image_src').notNull(),
  alt: varchar('alt', { length: 255 }),
  repo: text('repo').notNull(),
  demo: text('demo'),     
  technologies: jsonb('technologies').$type<{ name: string; icon: string }[]>().notNull().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});





