import {createParamDecorator,ExecutionContext} from "@nestjs/common"
import {Request} from "express"
export const TeacherEntry = createParamDecorator((data:any, ctx:ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest<Request>()
    return data ? req.body && req.body[data] : req.body
})
