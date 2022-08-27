import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";

// Reponse normalization step 
// Normalize error response going back to the client
// Express requires 4 params in error handling middleware

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) =>{
    if(err instanceof RequestValidationError){
        // Conver the validation error into common response error 
        // Singular error structure {message:"" , field: Optional}
        // Common resposne structure {errors: [Array of singular errors]}

        const errorArray = err.errors.map(error=>{
            return {message: error.msg, field: error.param}
        });
        return res.status(400).send({ errors: errorArray })
    }

    if(err instanceof DatabaseConnectionError){
        return res.status(500).send({ errors:[{ message:err.reason }]})
    }

    res.status(400).send({
        errors:[{ message: "Something went wrong" }]
    });
};