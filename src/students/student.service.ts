import {Injectable} from "@nestjs/common"
import {Student} from "./dto/student.dto"
@Injectable()
export class StudentService {
    private readonly students : Student[] = [];
    /**
     * 添加学生
     * @param s 
     * @returns 
     */
    create(s: Student):Promise<any> {
        return new Promise((resolve, reject)=>{
            this.students.push(s)
            resolve({
                message: "ok~~",
                storeInfo : s,
            })
        })
    }
    /**
     * 根据索引获取学生
     * @param index 
     * @returns 
     */
    getByIndex(index:number = 0):Promise<Student> {
        return new Promise((resolve, reject)=>{    
            const student:Student =  this.students[index]     
            console.log(`StudentService.getByIndex, index = ${index}, len = ${this.students.length}`)  
            resolve(student)
        })
    }

    move():string{
        console.log(`StudentService.move :: enter.`);
        return "I am moving~~"
    }
}