import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  /** User's email address. */
  @IsEmail()
  email!: string;

  /** Password - minimum 8 characters. */
  @IsString()
  @MinLength(8)
  password!: string;
}
