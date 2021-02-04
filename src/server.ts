import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import envvar from "env-var";
import routes from "./http/routes/routes";
import { MongoDBInMemory } from "./database/MongoDBInMemory";
import { AuthenticationMiddleware } from "./http/middlewares/AuthenticationMiddleware";
import { ExpressRequestMiddleware } from "./http/middlewares/ExpressRequestMiddleware";
import Logger from "./utils/Logger";

export class ExpressServer {
  PORT: Number = 3000;
  logger: Logger;

  constructor(protected app: Application = express()) {
    this.logger = new Logger(this.constructor.name);
  }

  async setupServer() {
    this.logger.info("Setting up server");
    this.checkEnviromentVariables();
    await this.database();
    this.middlewares();
    this.routes();
  }

  startApplication() {
    this.logger.info("Starting REST API instance");

    this.app.listen(this.PORT, () => {
      this.logger.info(`OmniChat API is running on port: ${this.PORT}`);
    });
  }

  private checkEnviromentVariables() {
    this.logger.info("Loading and validating enviroment variables");
    dotenv.config();
    this.PORT = envvar.get("PORT").asInt() || 3000;
    envvar.get("JWT_SECRET").required().asString();
  }

  private middlewares() {
    this.logger.info("Setting up middlewares");
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // Define as rotas que devem utilizar o middleware de autenticação
    const authenticationMiddleware = new AuthenticationMiddleware();
    this.app.use(
      "/surfboard",
      authenticationMiddleware.verifyJwtToken.bind(authenticationMiddleware)
    );

    // Seta o middleware de logs para todas as rotas
    const expressRequestMiddleware = new ExpressRequestMiddleware();
    this.app.use(
      expressRequestMiddleware.showLogs.bind(expressRequestMiddleware)
    );
  }

  private routes() {
    this.app.use(routes);
  }

  private async database() {
    const databaseInstance = new MongoDBInMemory();
    await databaseInstance.initDatabaseInstance();
    await databaseInstance.seedData();
  }
}
