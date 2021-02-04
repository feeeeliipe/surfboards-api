import Joi from "joi";
import SurfboardService, {
  SurfboardServiceInternalError,
} from "../../services/SurfboardService";
import { Request, Response } from "express";
import RequestValidator, { RequestArgsType } from "../utils/RequestValidator";

export default class SurfboardController {
  constructor(protected surfboardService = new SurfboardService()) {}

  static surfboardSchema(): Joi.Schema {
    return Joi.object({
      brand: Joi.string().required(),
      model: Joi.string().required(),
      length: Joi.string().required(),
      volume: Joi.number().required(),
    });
  }

  static surfboardScchemaForUpdating(): Joi.Schema {
    return Joi.object({
      brand: Joi.string().optional(),
      model: Joi.string().optional(),
      length: Joi.string().optional(),
      volume: Joi.number().optional(),
    });
  }

  async create(req: Request, res: Response) {
    try {
      const validatorResult = RequestValidator.validate(
        SurfboardController.surfboardSchema(),
        RequestArgsType.BODY,
        req
      );
      if (validatorResult.hasErrors) {
        res.status(422).send({ validations: validatorResult.errorDetail });
      }

      const surfboardCreated = await this.surfboardService.create(req.body);

      res.status(201).send(surfboardCreated);
    } catch (error) {
      if (error instanceof SurfboardServiceInternalError) {
        res.status(422).send({ message: error.message });
      } else {
        res.status(500).send({ message: "Something went wrong" });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const validatorResult = RequestValidator.validate(
        SurfboardController.surfboardScchemaForUpdating(),
        RequestArgsType.BODY,
        req
      );
      if (validatorResult.hasErrors) {
        res.status(422).send({ validations: validatorResult.errorDetail });
      }

      const updatedSurfboard = await this.surfboardService.update(
        req.params.id,
        req.body
      );

      res.status(200).send(updatedSurfboard);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      await this.surfboardService.remove(req.params.id);
      res.status(202).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const surfboard = await this.surfboardService.findById(req.params.id);
      res.send(surfboard);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const surfboards = await this.surfboardService.findAll();
      res.send(surfboards);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
