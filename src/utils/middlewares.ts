import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

const unknownEndpoint = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "invalid endpoint" });
  next();
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log({ err });
  if (err.name === "ValidationError") {
    res.status(400).json({ err: "ValidationError" });
  }

  next();
};

const policyHandler = <T>(
  schema: ZodType<T>,
  type: "params" | "query" | "body" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[type];

    try {
      const parsedSchema = schema.parse(data);
      req[type] = parsedSchema;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ error: "Validation error", details: error.format() });
      } else {
        next(error);
      }
    }
  };
};

const middlewares = {
  unknownEndpoint,
  errorHandler,
  policyHandler,
};

export default middlewares;
