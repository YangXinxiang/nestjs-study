import {Controller,Post,Get, Body, Res, Param} from "@nestjs/common"
import {Response} from "express"
import {StudentService} from "./student.service";
import {Student} from "./dto/student.dto"
@Controller("studennt")
export class StudentController {
    constructor(private studentService: StudentService){}

    @Post("create")
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