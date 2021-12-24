
import {Response, Request, NextFunction} from "express"
export function requestMiddleware(req: Request, res: Response, next:NextFunction) {
    console.log(`requestMiddleware :: enter, req.method = ${req.method}, req url = ${req.url}`);
    // 对OPTIONS请求做一个过滤，直接返回，正常情况下，这些是在ngix代理层配置的，这里因为自己本地或者服务器开发，就简单的写在代码的中间件层了。
    if(req.method === "OPTIONS") {
        // 在拦截中设置请求头，允许跨域
        res.setHeader("access-control-allow-credentials", "true")
        res.setHeader("access-control-allow-methods", "GET, POST, OPTIONS, PUT, DELETE");
        // 允许跨域，最关键的事下面这个请求头哈，否则不能跨域
        res.setHeader("access-control-allow-headers", "locale,Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization, WE-APP-ID,WE-TRACE-ID,WE-TOKEN,WE-CHANNEL")        
        res.setHeader("access-control-allow-origin", "*");
        res.status(204).send("")
    } else {
        next()
    }
}