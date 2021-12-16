import {ExceptionFilter, Catch, ArgumentsHost} from "@nestjs/common";
import {Request, Response} from "express"

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const req:Request = ctx.getRequest<Request>()
        const res:Response = ctx.getResponse<Response>()
        res.json({
            status: 5000,
            data: {
                url: req.url
            },
            message: "This is AnyFilter"
        })
    }
}