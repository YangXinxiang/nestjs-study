import {Injectable} from "@nestjs/common"
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm"
import {User} from "./user.entity"
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

    }

    

    findOne(id: number):Promise<any> {
        console.log(`UsersService.findOne :: enter, id = ${id}`)
        // return new Promise((resove, reject)=> {
        //     resove([])
        // })
       return this.userRepository.findOne(id);
        
    }

    // async removeOne(id: number) :Promise<void>{
    //     await this.userRepository.delete(id);
    // }

    // findAll(): Promise<User[]>{
        
    //     return this.userRepository.find()
    // }
}