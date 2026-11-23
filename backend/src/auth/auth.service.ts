import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as argon2 from "argon2";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.types";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

export interface TokenPairDto {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<Omit<User, "passwordHash">> {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.users.create({
      email: dto.email,
      passwordHash,
      roles: ["customer"],
    });

    const { passwordHash: _, ...userDto } = user;
    return userDto;
  }

  async login(dto: LoginDto): Promise<TokenPairDto> {
    const user = await this.users.findByEmail(dto.email);
    const ok = user && (await argon2.verify(user.passwordHash, dto.password));
    if (!ok) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.issueTokens(user);
  }

  async refresh(userId: number, refreshToken: string): Promise<TokenPairDto> {
    const user = await this.users.findById(userId);
    if (!user || !user.refreshHash) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const isValid = await argon2.verify(user.refreshHash, refreshToken);
    if (!isValid) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    return this.issueTokens(user);
  }

  private async issueTokens(user: User): Promise<TokenPairDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow("JWT_ACCESS_SECRET"),
        expiresIn: "15m",
        issuer: "addis-eats",
      }),
      this.jwt.signAsync(
        { sub: user.id },
        {
          secret: this.config.getOrThrow("JWT_REFRESH_SECRET"),
          expiresIn: "7d",
          issuer: "addis-eats",
        },
      ),
    ]);

    // Store hash of refresh token
    const refreshHash = await argon2.hash(refreshToken);
    this.users.setRefreshHash(user.id, refreshHash);

    return { accessToken, refreshToken };
  }
}
