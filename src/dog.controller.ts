import {Controller, Get, Res, Body, Post, Query, Inject} from "@nestjs/common"
import { AppService } from './app.service';
import {DogService} from "./dogs.service"
import {FoodDto} from "./dto/FoodDto"
import {Response} from "express"
@Controller("dog")
export  class DogController {
    // @Inject("DogService")
    // private readonly dogService:DogService;
    constructor(private readonly dogService: DogService<any>){}
    @Post("eat")
    eat(@Body() food: FoodDto, @Res() res:Response):Promise<any> {
        return new Promise((resolve, reject)=> {
            setTimeout(()=>{
                res.send(`Food save end, food = ${JSON.stringify(food)}`)
            },2000)
        })
    }

    @Get("hello")
    hello(@Res() res:Response):Promise<any> {
        return this.dogService.run().then((d)=>{
            res.send(d)
        })
    }

}