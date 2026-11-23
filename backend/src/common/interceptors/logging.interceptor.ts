import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Request } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP");

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const started = Date.now();
    const requestId = req.headers["x-request-id"] as string;
    const handler = `${context.getClass().name}.${context.getHandler().name}`;

    return next.handle().pipe(
      tap({
        next: () => this.log(req, handler, requestId, started, "ok"),
        error: (e) => this.log(req, handler, requestId, started, e.name),
      }),
    );
  }

  private log(req: Request, handler: string, requestId: string | undefined, started: number, outcome: string) {
    const ms = Date.now() - started;
    this.logger.log(`${req.method} ${req.url} -> ${handler} ${outcome} ${ms}ms [${requestId}]`);
  }
}
