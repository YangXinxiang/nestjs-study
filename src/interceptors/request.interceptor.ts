import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common"
import { Observable, tap, of } from "rxjs"
@Injectable()
export class RequestIntercepor implements NestInterceptor {
    // 不能将对OPTIONS类型的请求放到拦截器处理，因为到这一层的时候，已经会去检查路由处理程序是否有该路由的处理方法了，也就是必须要有@OPTIONS("update")了。
    // 而OPTIONS类型的请求，是不应该加到具体路由的业务代码中响应的，应该放到nginx代理层，或者nestjs服务的中间件层。
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // 模拟拦截器进行缓存处理。
        const isCached: boolean = false;
        if(isCached) {
            return of({
                "status": 200
            })
        } else{
            return next.handle().pipe(            
                tap((data)=>{
                    console.log(`RequestIntercepor.intercept :: response end,, data = `, data)
                })
            )
        }
    }
}