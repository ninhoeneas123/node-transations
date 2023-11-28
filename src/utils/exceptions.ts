export class Exception extends Error {
    statusCode: number; 

    constructor( message: string, statusCode: number = 500, name: string = 'Internal Server Error') {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.message = message
    }
}