import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { users, type User, type InsertUser } from '../shared/schema.js';
import * as bcrypt from 'bcryptjs';
import ws from 'ws';

// Configure WebSocket for Replit environment
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export interface IStorage {
  createUser(user: InsertUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  verifyPassword(email: string, password: string): Promise<User | null>;
  linkDiscord(userId: string, discordData: { discordId: string; discordUsername: string; discordAvatar: string }): Promise<User>;
  updateUserStatus(userId: string, status: 'partial' | 'full'): Promise<User>;
}

class DbStorage implements IStorage {
  async createUser(userData: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const [user] = await db.insert(users).values({
      ...userData,
      password: hashedPassword,
    }).returning();
    
    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  }

  async getUserById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  }

  async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async linkDiscord(userId: string, discordData: { discordId: string; discordUsername: string; discordAvatar: string }): Promise<User> {
    const [user] = await db.update(users)
      .set({
        discordId: discordData.discordId,
        discordUsername: discordData.discordUsername,
        discordAvatar: discordData.discordAvatar,
        status: 'full',
      })
      .where(eq(users.id, userId))
      .returning();
    
    return user;
  }

  async updateUserStatus(userId: string, status: 'partial' | 'full'): Promise<User> {
    const [user] = await db.update(users)
      .set({ status })
      .where(eq(users.id, userId))
      .returning();
    
    return user;
  }
}

export const storage = new DbStorage();
