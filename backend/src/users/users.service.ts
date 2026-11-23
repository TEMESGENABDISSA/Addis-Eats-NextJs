import { Injectable, Inject } from "@nestjs/common";
import { User, UserRole } from "./user.types";
import { UserRepository, USER_REPOSITORY } from "./user.repository";

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private readonly repo: UserRepository) {}

  findById(id: number): User | undefined {
    return this.repo.byId(id);
  }

  findByEmail(email: string): User | undefined {
    return this.repo.findByEmail(email);
  }

  create(user: Omit<User, "id">): User {
    return this.repo.create(user);
  }

  setRefreshHash(userId: number, hash: string): void {
    this.repo.setRefreshHash(userId, hash);
  }
}
