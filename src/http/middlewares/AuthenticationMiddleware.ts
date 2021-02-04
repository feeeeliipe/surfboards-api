import { Request, Response, NextFunction } from "express";
import AuthenticationService, {
  AuthenticationValidationError,
} from "../../services/AuthenticationService";
import Logger from "../../utils/Logger";

export class AuthenticationMiddleware {
  logger: Logger;

  constructor(protected authenticationService = new AuthenticationService()) {
    this.logger = new Logger(this.constructor.name);
  }

  async verifyJwtToken(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.info("Checking JWT Token");

      const token = req.headers.authorization;
      if (!token) {
        const message = "Token not provided";
        this.logger.info(message);
        return res.status(401).send({ message });
      }

      if (!token.includes("Bearer ")) {
        const message = "Token malformed";
        this.logger.info(message);
        return res.status(401).send({ message });
      }

      const rawToken = token.replace("Bearer ", "");
      await this.authenticationService.isValidJwtToken(rawToken);

      this.logger.info("Sending request to Controller");
      next();
    } catch (error) {
      this.logger.info("Invalid JWT Token");
      if (error instanceof AuthenticationValidationError) {
        res
          .status(401)
          .send({ message: `Unauthorized. Details: ${error.message}` });
      } else {
        res.status(500).send({
          message: `Error executing authentication middleware: ${error.message}`,
        });
      }
    }
  }
}
