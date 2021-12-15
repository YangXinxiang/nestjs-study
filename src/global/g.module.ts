import {Module, Global} from "@nestjs/common"
import {GlobalService} from "./g.service"
@Global()
@Module({
    exports:[GlobalService],
    providers:[GlobalService]
})
export class GlobalModule{}