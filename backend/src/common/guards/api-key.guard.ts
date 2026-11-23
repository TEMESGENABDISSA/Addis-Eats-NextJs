import { Injectable, CanActivate, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExecutionContext } from "@nestjs/common";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    // Temporarily disabled for development
    // Re-enable this when ready to test API key authentication
    return true;

    /*
    const req = context.switchToHttp().getRequest();
    const key = req.headers["x-api-key"];

    if (!key) {
      throw new UnauthorizedException("x-api-key is required");
    }

    const validKey = this.config.get<string>("API_KEY");
    if (key !== validKey) {
      throw new ForbiddenException("Invalid API key");
    }

    return true;
    */
  }
}
