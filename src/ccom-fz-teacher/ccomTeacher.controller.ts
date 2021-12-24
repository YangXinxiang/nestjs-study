import {Controller, Get, Post,Body, BadRequestException,Options, Res} from "@nestjs/common"
import {Response} from "express"
import {CCOMTeacherService} from "./ccomTeacher.service"
import {ITeacher} from "./interface/ITeacher"
const path = require("path")
const fzTeacherFileName = "hqgq-teacherList-FZ-RJ.json"
const fzTeacherFullPath = path.resolve(__dirname, `./data/${fzTeacherFileName}`).replace("dist", "src");
@Controller("ccom")
export class CCOMTeacherController {
    constructor(private readonly service: CCOMTeacherService){}
    @Get("teacherList")
    async getList(){
        console.log(`getList`)
        
        const data = await this.service.getList(fzTeacherFullPath)
        // console.log(data)
        return {
            status : 200,
            data,
        };
    }
    // Options方法类型的请求，不应该走到业务层处理，业务层不应该有这样的代码。
    // @Options("update")
    // handleOptions(@Res() res:Response) {
    //     console.log(`handleOptions :: enter`) 
    //     res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081")
    //     res.send("ok~~~~~~")
    //     console.log(`handleOptions :: end`) 
    //     // return "OK"
    // }
    @Post("update")
    async updateTeacher(@Body() teacher:any){
        console.log(`update :: enter, teacher = `, teacher) 
        if(teacher && teacher.id && teacher.name) {
            const data = await this.getList()
            let updatedTeacher:ITeacher;
            for(let item of data.data as Array<ITeacher>) {
                if(item.id === teacher.id){
                    console.log(`update :: found, item = `, item, `, teacher = `, teacher)
                    // 用新传入的老师的属性，覆盖原有的属性
                    Object.assign(item, teacher)
                    item.updateTime = new Date().toLocaleString()
                    updatedTeacher = item
                    break
                }
            }
            console.log(`update :: will update local file, path = `, fzTeacherFullPath)
            console.log(`update 0 = `,data.data[0])
            await this.service.updateList(fzTeacherFullPath, data.data)
            // 更新文件
            return {
                status : 200,
                data:updatedTeacher
            }
        } 
        throw new BadRequestException("参数错误")
    }
}