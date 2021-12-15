import {Module} from "@nestjs/common"
import {StudentController} from "./student.controller"
import {StudentService} from "./student.service"
@Module({
    providers:[StudentService],
    controllers:[StudentController],
    exports:[StudentService]
})
export class StudentModule {
    constructor(private readonly studentService:StudentService){
        studentService.getByIndex().then(data=>{
            console.log(`StudentModule.constructor :: enter, `, data)
        })
    }

    sMove():string{
        console.log(`StudentModule.sMove :: enter`)
        return "sMove ing"
    }
}