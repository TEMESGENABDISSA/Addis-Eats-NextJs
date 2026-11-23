import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) {
      return true; // no @Roles = open
    }

    const { user } = context.switchToHttp().getRequest();

    // Temporarily allow all requests until JWT authentication is implemented
    // In week 12, this will check: return requiredRoles.some((role) => user?.roles?.includes(role));
    return true;
  }
}
