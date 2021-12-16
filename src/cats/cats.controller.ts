import { Controller, Get, Query, Post, Body, Put, Param, Delete, Res, HttpException, HttpStatus} from '@nestjs/common';
import {Response} from "express"
import { CreateCatDto, /* UpdateCatDto, ListAllEntities */} from './dto/CatsDto';
import {Cat} from "./interfaces/cat.interface"
import {CatsService} from "./cats.service"
import {StudentService} from "../students/student.service"
import {GlobalService} from "../global/g.service"
@Controller('cats')
export class CatsController {
    constructor(
      private readonly catsService: CatsService, 
      private readonly studentService:StudentService,
      private readonly gService: GlobalService,
      ) {

    }
  @Post("create")
  async create(@Body() createCatDto: Cat, @Res() res: Response) {
      const rst = await this.catsService.create(createCatDto, res)
    return rst;
  }

  @Get("getOther")
  async getOther(){
    const rst = await this.studentService.move()
    const IPs = this.gService.getConnectIPs()
    console.log("CatsController.getOther", IPs)
    //const sMove = 
    return rst
  }

//   @Get()
//   findAll(@Query() query: ListAllEntities) {
//     return `This action returns all cats (limit: ${query.limit} items)`;
//   }

  // @Get(':id')
  // findOne(@Param('id') id: string, @Param('addr') addr: string):Cat {
  //     const rst:Cat = this.catsService.getByIndex(parseInt(id)) 
  //     console.log(rst)
  //     return rst
    
  // }

  @Get('mid')
  findOne1(@Param('id') id: string) {
    // throw new HttpException("Fobbiden", HttpStatus.FORBIDDEN)
    throw new HttpException({
      status:7777,
      data :{
        err : "ttt"
      },
      error: "It is error",
      desc : "Hello"
      
    }, HttpStatus.FORBIDDEN)
    // return `This action returns a #${id} cat`;

  }
//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
//     return `This action updates a #${id} cat`;
//   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}