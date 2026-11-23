import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  /** User's email address. */
  @IsEmail()
  email!: string;

  /** User's password. */
  @IsString()
  @MinLength(8)
  password!: string;
}
