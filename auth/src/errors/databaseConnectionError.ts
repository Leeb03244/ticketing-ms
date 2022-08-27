import { CustomError } from "./customError";

// This class extends CustomError abstract class for enforcement of member variables and member functions.
// Please see customError.ts for definition

export class DatabaseConnectionError extends CustomError {
    reason = "Error connecting to databse!";
    statusCode = 500;
    constructor(){
        super("Error connecting to database..");
        // Code below is only becuz we are subclassing a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }]
    }
}