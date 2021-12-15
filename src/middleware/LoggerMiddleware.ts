/**
 * 类式中间件
 */
import {NestMiddleware,Injectable} from "@nestjs/common";
import {Request, Response, NextFunction} from "express"
export class LoggerMiddle implements NestMiddleware {
    use(req: Request, res: Response, next:NextFunction) {
        console.log(`LoggerMiddle.use :: enter, body = `, req.body, req.query, req.params)
        next()
    }
}