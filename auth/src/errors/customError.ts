// Abstract class for all of the custom defined error types
// Needed to enforce the fields that the new custom error class MUST have
// Kind of like combination of what normal class definition in C++ also with member function return types
// We can also use instanceof with this absract clas in JS

export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string){
        super(message); // Basically new Error(message) so we retain the old behavior of base Error class - for logging in console.
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[]

}