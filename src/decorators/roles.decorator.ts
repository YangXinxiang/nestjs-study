// 自定义一个角色装饰器，给守卫用
// https://docs.nestjs.cn/8/guards
import {SetMetadata} from "@nestjs/common"
export const Roles = (...roles: string[]) => SetMetadata("roles", roles);