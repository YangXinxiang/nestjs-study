import {Injectable, Inject} from "@nestjs/common";
@Injectable()
export class CustomerService {
    move(from:number = 0, to:number=0) {
        console.log(`CustomerService.move, from = ${from}, to = ${to}`)
    }
}