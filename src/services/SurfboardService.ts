import Surfboard from "../domain/models/Surfboard";

export class SurfboardServiceInternalError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export interface SurfboardInterface {
  _id?: String;
  brand: String;
  model: String;
  length: String;
  volume: Number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class SurfboardService {
  constructor() {}

  async surfboardExists(id: string): Promise<boolean> {
    try {
      const item = await Surfboard.findById(id);
      return item ? true : false;
    } catch (error) {
      throw new SurfboardServiceInternalError(error.message);
    }
  }

  async create(surfboard: SurfboardInterface) {
    try {
      const created = await Surfboard.create(surfboard);
      return created;
    } catch (error) {
      throw new SurfboardServiceInternalError(
        `Something went wrong creating a new surfboard. Details: ${error.message}`
      );
    }
  }

  async update(id: string, surfboard: SurfboardInterface) {
    try {
      if (!(await this.surfboardExists(id))) {
        throw new SurfboardServiceInternalError("Submited id doesn't exists");
      }

      await Surfboard.updateOne({ _id: id }, surfboard);
      const updatedSurfboard = await Surfboard.findById(id);
      return updatedSurfboard;
    } catch (error) {
      throw new SurfboardServiceInternalError(
        `Something went wrong updating surfboard. Details: ${error.message}`
      );
    }
  }

  async remove(id: string) {
    try {
      if (!(await this.surfboardExists(id))) {
        throw new SurfboardServiceInternalError("Submited id doesn't exists");
      }

      await Surfboard.deleteOne({ _id: id });
    } catch (error) {
      throw new SurfboardServiceInternalError(
        `Something went wrong deleting surfboard. Details: ${error.message}`
      );
    }
  }

  async findAll() {
    try {
      const surfboards = await Surfboard.find({});
      return surfboards;
    } catch (error) {
      throw new SurfboardServiceInternalError(
        `Something went wrong retrieving surfboards. Details: ${error.message}`
      );
    }
  }

  async findById(id: string) {
    try {
      if (!(await this.surfboardExists(id))) {
        throw new SurfboardServiceInternalError("Submited id doesn't exists");
      }
      const surfboard = await Surfboard.findById(id);
      return surfboard;
    } catch (error) {
      throw new SurfboardServiceInternalError(
        `Something went wrong retrieving surfboard by id. Details: ${error.message}`
      );
    }
  }
}
