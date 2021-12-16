import {ArgumentsHost, ExceptionFilter, HttpException} from "@nestjs/common";
import {Response, Request} from "express"
export class PPExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const res: Response = ctx.getResponse<Response>()
        const req: Request = ctx.getRequest<Request>()
        const exceptionInfo = {
            exception,
            url: req.url
        }
        console.log(`PPExceptionFilter.catch,`, exceptionInfo)
        res.json(exceptionInfo)
    }
}