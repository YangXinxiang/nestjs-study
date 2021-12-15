/**
 * 函数式中间件
 */
import {Request, Response, NextFunction} from "express"
export function logger(req: Request, res: Response, next:NextFunction){
    console.log(`fn logger :: enter, body = `, req.body, req.query, req.params)
    next()
}