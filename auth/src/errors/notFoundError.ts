import { CustomError } from "./customError";

// This class extends CustomError abstract class for enforcement of member variables and member functions.
// Please see customError.ts for definition

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor(){
        super("Route not found..");

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors(){
        return [{ message: "Not found" }];
    }
}