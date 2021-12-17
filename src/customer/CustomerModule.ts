import {Module} from "@nestjs/common";
import {CustomerController} from "./CunstomerController"
import {CustomerService} from "./CustomerService"
import {Constants} from "../const/contants"
@Module({
    providers: [
        CustomerService, 
        {
            provide : Constants.C_PROVIDER_TEST_1,
            useValue : "Hello, I am c~~"
        }
    ],
    controllers : [CustomerController]
})
export class CustomerModule {}