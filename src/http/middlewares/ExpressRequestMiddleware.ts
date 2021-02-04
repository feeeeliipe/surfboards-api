import { Request, Response, NextFunction } from "express";
import Logger from "../../utils/Logger";

export class ExpressRequestMiddleware {
  logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }

  showLogs(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Request received`);
    this.logger.info(`Method: ${req.method} | URL: ${req.url}`);
    this.logger.info(`Headers: ${JSON.stringify(req.headers)}`);
    this.logger.info(`Body: ${JSON.stringify(req.body)}`);

    next();
  }
}
