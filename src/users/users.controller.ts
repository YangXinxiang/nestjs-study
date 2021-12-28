import {Controller,Inject, Injectable, Get, Post, Param} from "@nestjs/common"
import {UsersService} from "./users.service"
@Controller("user")
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Get(":id")
    async findOne(@Param("id") id:string){
        console.log(`UsersController.findOne :: enter, id = ${id}, type = ${typeof id}`)
        const rst = await this.userService.findOne(parseInt(id))
        return rst
    }
}