import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";

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
(req: Request, res: Response) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log("Creating user...");

    res.send({});
});

export { router as signUpRouter };