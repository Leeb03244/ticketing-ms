import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

// Reponse normalization step 
// Normalize error response going back to the client
// Express requires 4 params in error handling middleware

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    // Convert the validation error into common response error 
    // Singular error structure {message:"" , field: Optional}
    // Common resposne structure {errors: [Array of singular errors]}
    // Serializing done in objects

    if(err instanceof CustomError){
        return res.status(err.statusCode).send({ errors: err.serializeErrors() })
    }

    res.status(400).send({
        errors:[{ message: "Something went wrong" }]
    });
};