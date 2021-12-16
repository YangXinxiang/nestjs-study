import { HttpException, HttpStatus } from "@nestjs/common";
export class SimpleException extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status)
    }
}