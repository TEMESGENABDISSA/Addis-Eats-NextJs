import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Request } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@InjectPinoLogger() private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const started = Date.now();
    const handler = `${context.getClass().name}.${context.getHandler().name}`;

    return next.handle().pipe(
      tap({
        next: () => this.log(req, handler, started, "ok"),
        error: (e) => this.log(req, handler, started, e.name),
      }),
    );
  }

  private log(req: Request, handler: string, started: number, outcome: string) {
    const ms = Date.now() - started;
    this.logger.info(
      {
        method: req.method,
        url: req.url,
        handler,
        outcome,
        durationMs: ms,
      },
      `${req.method} ${req.url} -> ${handler} ${outcome} ${ms}ms`,
    );
  }
}
