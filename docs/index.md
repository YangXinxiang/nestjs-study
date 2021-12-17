# 这里记录一些学习的难点和问题
## 问题1 动态路由遇到问题
链接： https://docs.nestjs.cn/8/controllers?id=%e8%b7%af%e7%94%b1

在app.controller.ts中，有这样的一个路由控制器
`
  @Get("dyRoute:id")
  dyRoute(@Param("id") id):string {    
    return "Hello, yxx, id = " +id
  }
`
访问的时候这样访问：http://localhost:3000/dyRoute:567 页面能返回 Hello, yxx, id = :567
很奇怪，id的值是 :567，多了一个冒号:

但是如果这样访问：http://localhost:3000/dyRoute/567 页面就访问不到了， why ？？ 

## 问题2 基于属性的注入，是如何注入的？是讲provider(service)按属性注入到contronller中，还是在provider(service)的构造函数中，讲依赖注入？
链接： https://docs.nestjs.cn/6/providers

### 2.1， provider(service)可以导入对其他service的依赖，但是到目前为止，使用属性的方式注入依赖貌似还没有成功。
使用构造函数的方式是你能注入成功的
`
@Injectable()
export class DogService<T> {
//   @Inject('HTTP_OPTIONS')
//   private readonly httpClient: HTTP_OPTIONS<any>;

 constructor(private readonly httpClient: HTTP_OPTIONS<any>){}

  run():Promise<any> {
    return new Promise((resolve, reject)=> {
        resolve("DogService.run, "+this.httpClient.getInfo())
    })
}
}
`

### 2.2， controller中可以在构造函数中注入依赖的provider(service)
使用构造函数的方式是你能注入成功的，但是使用所谓的属性的方式还是注入失败
`
import {Controller, Get, Res, Body, Post, Query, Inject} from "@nestjs/common"
import {DogService} from "./dogs.service"
import {FoodDto} from "./dto/FoodDto"
import {Response} from "express"
@Controller("dog")
export  class DogController {
    // @Inject("DogService")
    // private readonly dogService:DogService;
    constructor(private readonly dogService: DogService<any>){}

    @Get("hello")
    hello(@Res() res:Response):Promise<any> {
        return this.dogService.run().then((d)=>{
            res.send(d)
        })
    }

}
`

### 2.3， 在provider中自定义方式注入的exception filter如何使用呢
https://docs.nestjs.cn/8/exceptionfilters?id=%e5%9f%ba%e7%a1%80%e5%bc%82%e5%b8%b8%e7%b1%bb


`
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
`
2021.12.16还没有整明白，先跳过吧。。。。

### 2.4，基于基类BaseExceptionFilter 来创建个性化的异常捕获的时候，实例化该类，需要传一个adapter，为啥捏
`
/**
 * 基于核心基类来创建过滤器
 * 这个要注意，实例化类的时候，需要传入一个adapter参数，否则会报错。
 *   const { httpAdapter } = app.get(HttpAdapterHost); // 这个httpAdapter是干啥用的捏？？？
 *   app.useGlobalFilters(new AnyExceptionFilter2(httpAdapter)) // 应用全局的异常捕获的时候，需要传异常捕获的实例
 */
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AnyExceptionFilter2 extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
    console.log(`AnyExceptionFilter2.catch :: got exception....`)
  }
}
`
使用的时候需要这样使用：
`
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger} from "./middleware/logger"
import {PPExceptionFilter, AnyExceptionFilter, AnyExceptionFilter2} from "./exception"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AnyExceptionFilter2(httpAdapter)) // 应用全局的异常捕获的时候，需要传异常捕获的实例
  app.use(logger) // 设置全局的中间件
  await app.listen(3000);
}
bootstrap();

`

当然，咱们也可以直接实现异常捕获接口，实现一个完全自定义的异常捕获

`
import {ExceptionFilter, Catch, ArgumentsHost} from "@nestjs/common";
import {Request, Response} from "express"

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const req:Request = ctx.getRequest<Request>()
        const res:Response = ctx.getResponse<Response>()
        res.json({
            status: 5000,
            data: {
                url: req.url
            },
            message: "This is AnyFilter"
        })
    }
}
`


### 2.5，使用 Joi问题
 import Joi, {Schema}  from "joi" 提示错误，没有导入到Joi。。。 why？？ 先不纠结
`

// import Joi, {Schema}  from "joi"
const Joi = require('@hapi/joi'); // 为嘛用import不行呢。。。。先不纠结，搞这种极度不推荐的混合模式吧
export const createCatSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required,
    desc: Joi.string()
})
Joi.object()
`