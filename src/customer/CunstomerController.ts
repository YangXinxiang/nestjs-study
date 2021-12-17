import {Controller, Get, Inject} from "@nestjs/common"
import {CustomerService} from "./CustomerService"
import {Constants} from "../const/contants"
@Controller("pp")
export class CustomerController {
    @Inject(CustomerService)
    private readonly cService: CustomerService;

    @Inject(Constants.C_PROVIDER_TEST_1)
    private readonly cP: string
    @Get("m")
    move(){
        console.log(`CustomerController :: enter, this.cp = ${this.cP}`)
        this.cService.move(5,20)
        return "moved~~"
    }
}