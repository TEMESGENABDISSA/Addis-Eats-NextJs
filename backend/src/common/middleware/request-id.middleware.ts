import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Honour an id the caller already sent, or make one
    const id = (req.headers["x-request-id"] as string) ?? randomUUID();

    req.headers["x-request-id"] = id; // for the filter and the logger
    res.setHeader("x-request-id", id); // so the client can quote it

    next();
  }
}
