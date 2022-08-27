import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

// This class extends CustomError abstract class for enforcement of member variables and member functions.
// Please see customError.ts for definition

export class RequestValidationError extends CustomError {
    statusCode = 400;
    // Private here is equivalent as making a member errors and assigning it
    constructor(public errors: ValidationError[]){
        // Call base class constructor
        super("Error in request parameters..");
        // Code below is only becuz we are subclassing a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error=>{
            return {message: error.msg, field: error.param}
        });
    }
}