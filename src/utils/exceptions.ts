export class BadRequestException extends Error {
    statusCode: number; 

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.name = 'BadRequestException';
        this.statusCode = statusCode;
        this.message = message
    }
}