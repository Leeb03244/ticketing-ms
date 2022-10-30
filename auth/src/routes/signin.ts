import express from "express";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/badRequestError";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be in valid."),
    body("password").trim().notEmpty().withMessage("You must enter a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) throw new BadRequestError("Login request failed");

    const doesPasswordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!doesPasswordMatch) throw new BadRequestError("Login request failed");

    //Generate Json web token
    //JWT_KEY is in auth-deployment.yaml
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    //Store it in the session
    //Can try decode at https://www.base64encode.org
    //And verify JWT signature in jwt.io
    //JWT is for tamper proofing, payload can be visible to anyone

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
