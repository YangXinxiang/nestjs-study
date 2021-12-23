/**
 * 函数式中间件
 */
import {Request, Response, NextFunction,} from "express"
import {RequestMethod} from "@nestjs/common"
export function logger(req: Request, res: Response, next:NextFunction){
    console.log(`fn logger :: enter, body = `, req.body, req.method, req.params)
    // res.send("~~~~")
    // return "middleware"
   // console.log(req.url, req.body, req.headers)
   // console.log(req)
//    if(req.method === "OPTIONS"){
//     // return "ok";
//    }
    next()
}