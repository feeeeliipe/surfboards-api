import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import UserModel from "../domain/models/UserModel";
import bcrypt from "bcrypt";
import Surfboard from "../domain/models/Surfboard";
import Logger from "../utils/Logger";

export class MongoDBInMemory {
  logger: Logger;

  constructor(protected mongod = new MongoMemoryServer()) {
    this.logger = new Logger(this.constructor.name);
  }

  async initDatabaseInstance(): Promise<MongoMemoryServer> {
    this.logger.info("Starting database instance");
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose.connect(await this.mongod.getUri(), mongooseOpts);

    return this.mongod;
  }

  async closeDatabaseInstance() {
    await this.mongod.stop();
  }

  async seedData() {
    try {
      this.logger.info("Populating database");

      // Remove todos os registros da base
      await UserModel.deleteMany({});
      await Surfboard.deleteMany({});

      // Popula um usuário na base para autenticação
      await UserModel.create({
        username: "admin@omnichat.com.br",
        password: bcrypt.hashSync("senha123", 2),
      });

      const surfboards = [
        {
          brand: "Rusty",
          model: "Dwart Too",
          length: "5.11",
          volume: 37,
        },
        {
          brand: "Index Krown",
          model: "Green Light",
          length: "6.2",
          volume: 32,
        },
        {
          brand: "Cabianca",
          model: "The Medina",
          length: "5.7",
          volume: 26,
        },
      ];

      // Popula pranchas de surf para teste
      for (let i = 0; i < surfboards.length; i++) {
        const surfboard = surfboards[i];
        await Surfboard.create(surfboard);
      }
    } catch (error) {
      throw new Error("Something went wrong when seeding database");
    }
  }
}
