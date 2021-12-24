// 练习 装饰器聚合
// https://docs.nestjs.cn/8/customdecorators

import {applyDecorators, SetMetadata, UseGuards, UseInterceptors} from "@nestjs/common"
import {RoleGuard} from "../guard/RoleGuard"
import {LogginInterceptor} from "../interceptors/LogginInterceptor"
export function AllAuth(...roles:any[]) {
    return applyDecorators(
        SetMetadata("roles", roles),
        UseGuards(RoleGuard),
        UseInterceptors(LogginInterceptor)
    )
}