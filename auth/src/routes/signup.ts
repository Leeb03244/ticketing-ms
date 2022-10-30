import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { BadRequestError } from "../errors/badRequestError";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

// Express-Validator to validate and sanitize incoming data
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be in valid format."),
    body("password")
      .trim() // Sanitization of the password - no leading or trailing spaces
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 ~ 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new BadRequestError(existingUser.email + " email is in use");
    }

    const newUser = User.build({ email: email, password: password });
    await newUser.save();

    //Generate Json web token
    //JWT_KEY is in auth-deployment.yaml
    const userJwt = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
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

    res.status(201).send(newUser);
  }
);

export { router as signUpRouter };
