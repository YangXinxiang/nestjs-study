/**
 * 练习中间件： https://docs.nestjs.cn/8/middlewares
 */
import {Controller,Post,Get, Body, Res, Param, UseGuards, SetMetadata} from "@nestjs/common"
import {Response} from "express"
import {StudentService} from "./student.service";
import {Student} from "./dto/student.dto"
import {RoleGuard} from "../guard/RoleGuard"
import {Roles} from "../decorators/roles.decorator"
@Controller("studennt")
@UseGuards(RoleGuard)
export class StudentController {
    constructor(private studentService: StudentService){}

    @Post("create")
   // @SetMetadata("roles", ["admin"])
    @Roles("admin", "superadmin")// 这个路由处理程序，要求角色满足是"admin", "superadmin"
    create(@Body() studentInfo:Student, @Res() res: Response){
        this.studentService.create(studentInfo).then((data)=>{
            res.send({
                status: 200,
                data,
            })
        })
    }

    @Get(":index")
    async getByIndex(@Param("index") index: string,  @Res() res: Response) {
        const data:Student = await this.studentService.getByIndex(parseInt(index));
        res.send({
            status: 200,
            data,
        })
    }
}