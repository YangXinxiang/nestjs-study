import {CallHandler, ExecutionContext, Injectable, NestInterceptor,RequestMethod} from "@nestjs/common"

import { Observable, tap } from "rxjs"
import {Response, Request} from "express"
@Injectable()
export class RequestIntercepor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const httpHost = context.switchToHttp()
        const req:Request = httpHost.getRequest()
        const res:Response = httpHost.getResponse()
        console.log(`RequestIntercepor.intercept :: enter, method = ${req.method}, url = ${req.url}`)
        // 在拦截中设置请求头，允许跨域
        res.setHeader("access-control-allow-credentials", "true")
        res.setHeader("access-control-allow-methods", "GET, POST, OPTIONS, PUT, DELETE");
        // 允许跨域，最关键的事下面这个请求头哈，否则不能跨域
        res.setHeader("access-control-allow-headers", "locale,Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization, WE-APP-ID,WE-TRACE-ID,WE-TOKEN,WE-CHANNEL")        
        res.setHeader("access-control-allow-origin", "*");
        if(req.method === "OPTIONS") {
            // options类型的请求，一般都不返回body，因此用状态码204
            res.status(204).send("")
        } else {
            return next.handle().pipe(
                tap(()=>{
                    console.log(`RequestIntercepor.intercept :: response end,req.method = ${req.method}`)
                })
            )
        }
    }
}