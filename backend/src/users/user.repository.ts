import { User, UserRole } from "./user.types";

export const USER_REPOSITORY = "USER_REPOSITORY";

export interface UserRepository {
  all(): User[];
  byId(id: number): User | undefined;
  findByEmail(email: string): User | undefined;
  create(user: Omit<User, "id">): User;
  setRefreshHash(userId: number, hash: string): void;
}

export class InMemoryUserRepository implements UserRepository {
  private users: Map<number, User> = new Map();
  private nextId = 1;

  constructor() {
    this.seed();
  }

  all(): User[] {
    return Array.from(this.users.values());
  }

  byId(id: number): User | undefined {
    return this.users.get(id);
  }

  findByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find((u) => u.email === email);
  }

  create(user: Omit<User, "id">): User {
    const id = this.nextId++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  setRefreshHash(userId: number, hash: string): void {
    const user = this.users.get(userId);
    if (user) {
      user.refreshHash = hash;
    }
  }

  private seed(): void {
    // Seed with a staff user for testing
    const staffUser: User = {
      id: this.nextId++,
      email: "staff@addiseats.et",
      passwordHash: "$argon2id$v=19$m=65536,t=3,p=2$someHashForTesting", // Will be replaced by actual hash
      roles: ["staff"],
    };
    this.users.set(staffUser.id, staffUser);
  }
}
