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