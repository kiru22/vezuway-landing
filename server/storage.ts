import { type User, type InsertUser, type Registration, type InsertRegistration, type Visitor, type InsertVisitor } from "@shared/schema";
import { db } from "./db";
import { registrations, visitors } from "@shared/schema";
import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getAllRegistrations(): Promise<Registration[]>;
  createVisitor(visitor: InsertVisitor): Promise<Visitor>;
  getAllVisitors(): Promise<Visitor[]>;
  hasRecentVisitor(ip: string | null): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createRegistration(registration: InsertRegistration): Promise<Registration> {
    const result = await db.insert(registrations).values(registration).returning();
    return result[0];
  }

  async getAllRegistrations(): Promise<Registration[]> {
    return db.query.registrations.findMany();
  }

  async createVisitor(visitor: InsertVisitor): Promise<Visitor> {
    const result = await db.insert(visitors).values(visitor).returning();
    return result[0];
  }

  async getAllVisitors(): Promise<Visitor[]> {
    return db.query.visitors.findMany({
      orderBy: (visitors, { desc }) => [desc(visitors.createdAt)],
    });
  }

  async hasRecentVisitor(ip: string | null): Promise<boolean> {
    if (!ip) return false;
    
    const result = await db.query.visitors.findFirst({
      where: (visitors, { eq, and, gt }) => 
        and(
          eq(visitors.ip, ip),
          gt(visitors.createdAt, sql`NOW() - INTERVAL '10 minutes'`)
        ),
    });
    
    return !!result;
  }
}

export const storage = new MemStorage();
