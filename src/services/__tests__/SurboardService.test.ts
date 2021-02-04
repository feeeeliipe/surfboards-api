import { MongoDBInMemory } from "../../database/MongoDBInMemory";

import SurfboardService, { SurfboardInterface } from "../SurfboardService";

describe("Unit test for SurboardService", () => {
  const surfboardService = new SurfboardService();
  const mongodb = new MongoDBInMemory();

  beforeAll(async () => {
    await mongodb.initDatabaseInstance();
    await mongodb.seedData();
  });

  afterAll(async () => {
    await mongodb.closeDatabaseInstance();
  });

  it("Should create a new surfboard with _id defined when a valid object is submited", async () => {
    const newSurfboard = {
      model: "Modelo da Prancha",
      brand: "Marca da Prancha",
      length: "5.6",
      volume: 24,
    };
    const result = await surfboardService.create(newSurfboard);

    expect(result._id).toBeDefined();
  });

  it("Should return a list of 4 surfboards when findAll is invoked", async () => {
    const result = await surfboardService.findAll();
    expect(result.length).toEqual(4);
  });
});
