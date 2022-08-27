import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    // Private here is equivalent as making a member errors and assigning it
    constructor(public errors: ValidationError[]){
        // Call base class constructor
        super();
        // Code below is only becuz we are subclassing a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}