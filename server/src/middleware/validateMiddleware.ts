import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error:any) {
    console.log(error)
    res.status(400).json({ errors: error?.errors.map((err: any) => err.message) });
  }
};

export default validate;

  