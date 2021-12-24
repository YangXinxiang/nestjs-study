import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common"
import { Observable, tap } from "rxjs"

@Injectable()
export class LogginInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log(`intercept :: enter, before handle`)
        const now = Date.now()
        return next.handle().pipe(tap(
            ()=>{
                console.log(`intercept ::after handle, used time = ${Date.now() - now}`)
            }
        ))
    }
}