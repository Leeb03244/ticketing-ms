export class DatabaseConnectionError extends Error {
    reason = "Error connecting to databse!";
    constructor(){
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}