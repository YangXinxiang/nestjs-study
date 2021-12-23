import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Reflector} from "@nestjs/core"
import { Observable } from "rxjs";
import {Request, Response} from "express"
@Injectable() 
export class IPGuard implements CanActivate {
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request:Request = context.switchToHttp().getRequest<Request>();
        const requestIP: string = request.headers.ip + ""; // 请求的ip
        // 获取设置的允许访问的ip列表，如果ip列表为空，表示不拦截，放行；如果有ip列表，客户端的ip必须在ip列表中才放行。
        const ips = this.reflector.get<string[]>("ips", context.getHandler())
        console.log(`IPGuard :: canActivate , ips = `, ips, "requestIP = ", requestIP)
        if(!ips){
            return true;
        }else{
            return ips.includes(requestIP)
        }
        
    }
}