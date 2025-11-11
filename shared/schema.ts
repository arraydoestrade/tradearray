import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const traderRoles = [
  'Algorithmic Trader',
  'Orderflow Trader',
  'Quant Trader',
  'Smart Money Trader',
  'Content Creator',
  'Server Owner',
  'Other',
] as const;

export type TraderRole = typeof traderRoles[number];

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  knownAs: text('known_as').notNull(),
  discordId: text('discord_id'),
  discordUsername: text('discord_username'),
  discordAvatar: text('discord_avatar'),
  status: text('status').notNull().default('partial'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email().refine(
    (email) => {
      const validDomains = ['.com', '.net', '.org', '.edu', '.gov', '.io', '.co', '.uk', '.us', '.ca', '.de', '.fr', '.jp', '.cn', '.au', '.ru', '.es', '.it', '.nl', '.se', '.no', '.fi', '.dk', '.pl', '.ch', '.at', '.be', '.pt', '.gr', '.cz', '.ie', '.nz', '.sg', '.hk', '.mx', '.br', '.in', '.kr', '.za', '.ar', '.cl', '.pe', '.ve', '.co.uk', '.ac.uk', '.com.au', '.co.nz', '.co.za'];
      return validDomains.some(domain => email.toLowerCase().endsWith(domain));
    },
    { message: 'Email must have a valid domain (.com, .net, .org, etc.)' }
  ),
  username: z.string().min(3).max(50),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  knownAs: z.enum(traderRoles),
}).omit({
  id: true,
  createdAt: true,
  discordId: true,
  discordUsername: true,
  discordAvatar: true,
  status: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
