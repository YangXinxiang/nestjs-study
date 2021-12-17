/**
 * 练习守卫 guards: https://docs.nestjs.cn/8/guards
 */
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common"
import {Reflector} from "@nestjs/core"
import { Observable } from "rxjs"
import {Request,Response} from "express"

@Injectable()
export class RoleGuard implements CanActivate{
    // reflector哪来的？实例化传来？还是Nest注入的时候传来？？
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // 通过反射获取当前正在访问的路由的处理程序信息
        const roles = this.reflector.get<string[]>("roles", context.getHandler());
        console.log(`RoleGuard.canActivate, roles = `, roles)
        // 说明该路由的处理程序不需要控制角色
        if(!roles){
            return true
        }
        const request:Request = context.switchToHttp().getRequest<Request>();
        const role:string = request.headers.role +"";
        const match:boolean = this.matchRoles(roles, role)
        console.log(`RoleGuard.canActivate ::  request.url = ${request.url}, role = ${role}, match = ${match}`);
        throw new UnauthorizedException();
        return match;
        console.log(context.getClass())
        console.log(context.getHandler())
        return false
    }
    /**
     * 判断角色是否支持
     * @param roles ， 满足条件的角色列表
     * @param role ， 当前请求的角色
     * @returns 
     */
    matchRoles(roles:string[], role:string):boolean{
        return roles.includes(role)
    }
}