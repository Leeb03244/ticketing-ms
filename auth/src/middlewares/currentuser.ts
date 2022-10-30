import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface userPayload {
  id: string;
  email: string;
}

// Reach into a exsiting type definition and make modifications below
// Dont need to "extend" since we are modifying a existing interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as userPayload;

    req.currentUser = payload;
  } catch (err) {}

  next();
};
