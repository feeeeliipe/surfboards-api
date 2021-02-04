import { Request, Response } from "express";
import Joi from "joi";
import AuthenticationService, {
  AuthenticationValidationError,
} from "../../services/AuthenticationService";
import RequestValidator, { RequestArgsType } from "../utils/RequestValidator";

export default class AuthenticationController {
  constructor(protected authenticationService = new AuthenticationService()) {}

  static userSchema(): Joi.Schema {
    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
  }

  async authenticate(req: Request, res: Response) {
    try {
      const validatorResult = RequestValidator.validate(
        AuthenticationController.userSchema(),
        RequestArgsType.BODY,
        req
      );
      if (validatorResult.hasErrors) {
        res.status(422).send({ validations: validatorResult.errorDetail });
      }

      const token = await this.authenticationService.authenticate(req.body);

      res.status(200).send({ token });
    } catch (error) {
      if (error instanceof AuthenticationValidationError) {
        res.status(401).send({ message: error.message });
      } else {
        res.status(500).send({ message: "Something went wrong" });
      }
    }
  }
}
