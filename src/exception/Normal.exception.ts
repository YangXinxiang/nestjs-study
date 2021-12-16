import { HttpException, HttpStatus } from "@nestjs/common";
import {IException} from "./IException"
export class NormalException extends HttpException {
    constructor(message: IException, status: HttpStatus) {
        super(message, status)
    }
}