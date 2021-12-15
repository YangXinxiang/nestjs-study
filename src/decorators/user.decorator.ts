import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const User = createParamDecorator((data:any, ec:ExecutionContext) => {
    const request = ec.switchToHttp().getRequest()
    console.log(request)
    return `Decoratored :: ${request.body.user}`
})

export const UserEntry = createParamDecorator((data: string, ec: ExecutionContext) => {
    const request = ec.switchToHttp().getRequest()
    const user = request.body.user
    return user ? user[data] : user
    
})

export function MyDecorate(param) {
    return  function useDec(target, key, description) {
        console.log(`MyDecorate :: param = ${param}, key = ${key}, v = ${description.value}`)
    }
}