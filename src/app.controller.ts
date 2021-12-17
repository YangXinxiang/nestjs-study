import { Controller, Get, Post, Res, Query,Ip,Headers,Body,Req, HttpCode, Header, Param, HostParam, Inject, UseFilters, Catch} from '@nestjs/common';
import { AppService } from './app.service';
import { Request,Response } from 'express';
import {User, UserEntry,MyDecorate} from "./decorators/user.decorator"
import {CatsDto} from "./cats/dto/CatsDto"
@Controller({host:":avc"})
export class AppController {
  @Inject("INJECT_EXCEPTION")
  private readonly cci:string;
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  /**
   * 可以通过装饰器Req来获取请求信息，注解@Req() 请求信息返回的是express中的Request实例，可以通过该实例获取ip， query等信息
   * @param request 
   * @returns 
   */
  @Get("yxx")
  getYxx(@Req() request: Request):string {
    console.log(request.ip, request.query)
    console.log(this.cci)
    return "Hello, yxx" + JSON.stringify(this.cci)
  }

  @Get("yxx66")
  getYxx66(@HostParam("avc") account):string {
    console.log(account)
    return "getYxx66 Hello, yxx" + account
  }

  /**
   * 练习路由中的通配符
   * @param request 
   * @returns 
   */
  @Get("uu**cc")
  getUU(@Req() request: Request):string {
    console.log(request.ip, request.query)
    return "Hello, get uu"
  }

  @Get("yxx2")
  getYxx2(@Req() request: Request, @Res() res:Response):string {
    console.log(request.ip, request.query)
    if(request.query.redirect) {
      res.redirect(request.query.redirect+"", 302)
    }
    return "Hello, yxx"
  }
  /**
   * 练习动态路由
   * 但是测试下来有问题啊，只能这样访问： http://localhost:3000/dyRoute:567
   * 返回： Hello, yxx, id = :567 多了一个冒号
   * 居然不支持http://localhost:3000/dyRoute/567   why ????
   * @param id 
   * @returns 
   */
  @Get("dyRoute:id")
  dyRoute(@Param("id") id):string {    
    return "Hello, yxx, id = " +id
  }
  /**
   * 可以通过开箱即用的装饰器获取请求信息，比如@Body()获取post上来的body数据
   * @param info 
   * @returns 
   */
  @Post("save")
  @MyDecorate("~~~")
  saveInfos(@Body() info):string {
    console.log(info)
    console.log(`saveInfos :: enter, info = ${JSON.stringify(info)}`)
    const rst = {
      rr : "rr",
      ...info
    }
    return rst
  }

  @Post("saveUsss")
  saveUser(@User() uu) {
    console.log(`saveUser :: enter`)
    console.log(uu)
    return {
      uu:"my uu"
    }
  }

  @Post("saveUsss2")
  saveUser2(@UserEntry("name") n:string) {
    console.log(`saveUsss2 :: enter`)
    console.log(n)
    return {
      uu:"my uu222",
      nn: n
    }
  }

  @Post("saveUsss3")
  saveUser3(@UserEntry("name") n:string) {
    console.log(`saveUsss3 :: enter`)
    console.log(n)
    return {
      uu:"my uu222",
      nn: n
    }
  }

  @Post("saveUsss4")
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  @Header('NeedU', 'y')
  saveUser4( @UserEntry("name") n:string, @Res() res: Response) {
    console.log(`saveUsss4 :: enter`)
    console.log(n)

    res.json({
      "address":"bj",
      "from" : "yn",
      "status" : "ok",
      n
    })
    
  }

  // @Post("saveCat")
  // async recordCat(@Body() cat: CatsDto, @Res() res:Response):Promise<any>{
  //   console.log(`recordCat :: enter`)
  //   return new Promise((resolve, reject)=> {
  //     setTimeout(()=>{
  //       // return 
  //       res.send("Hello, cats~~ " + cat.name + ", address = " + cat.address)
  //     },2000)
  //   })
  //  // console.log(cat)
  // }
}
