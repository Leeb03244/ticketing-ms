import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { User } from "../models/user";
import { BadRequestError } from "../errors/badRequestError";

const router = express.Router();

// Express-Validator to validate and sanitize incoming data
router.post('/api/users/signup', [
    body("email")
        .isEmail()
        .withMessage("Email must be in valid format."),
    body("password")
        .trim() // Sanitization of the password - no leading or trailing spaces
        .isLength({ min:4 , max:20 })
        .withMessage("Password must be between 4 ~ 20 characters")
],
async (req: Request, res: Response) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email:email });

    if(existingUser){
        throw new BadRequestError(existingUser.email + " email is in use");
    }
    
    const newUser = User.build({ email: email, password: password })
    await newUser.save();
    
    res.status(201).send(newUser);
});

export { router as signUpRouter };