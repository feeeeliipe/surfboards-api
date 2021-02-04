import { Request } from "express";
import Joi from "joi";

export enum RequestArgsType {
  BODY = "body",
  QUERY = "query",
  PATHPARAMS = "params",
}

interface ValidatorResult {
  hasErrors: boolean;
  errorDetail: any;
}

class RequestValidator {
  validate(
    schema: Joi.Schema,
    argsType: RequestArgsType,
    req: Request
  ): ValidatorResult {
    const validatorResult = schema.validate(req[argsType], {
      abortEarly: false,
    });

    return {
      hasErrors: validatorResult.error ? true : false,
      errorDetail:
        validatorResult.error?.details.map((error) => error.message) ||
        undefined,
    };
  }
}

export default new RequestValidator();
