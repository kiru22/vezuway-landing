import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  type: text("type").notNull(),
  role: text("role").default("sender"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const visitors = pgTable("visitors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ip: text("ip"),
  country: text("country"),
  device: text("device"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  createdAt: true,
}).extend({
  phone: z.string().optional(),
  role: z.string().optional(),
});

export const insertVisitorSchema = createInsertSchema(visitors).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type Visitor = typeof visitors.$inferSelect;
