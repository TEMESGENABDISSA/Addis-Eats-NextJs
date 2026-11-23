import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { InMemoryUserRepository, USER_REPOSITORY } from "./user.repository";

@Module({
  providers: [
    UsersService,
    { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
  ],
  exports: [UsersService],
})
export class UsersModule {}
