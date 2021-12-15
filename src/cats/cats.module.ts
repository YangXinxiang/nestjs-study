import {Module} from "@nestjs/common";
import {CatsService} from "./cats.service"
import {CatsController} from "./cats.controller"
import {StudentModule} from "../students/student.module"
@Module({
    providers:[CatsService],
    controllers:[CatsController],
    imports:[StudentModule]
})
export class CatsModule {}