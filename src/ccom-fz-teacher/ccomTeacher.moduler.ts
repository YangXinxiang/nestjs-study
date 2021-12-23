import {Module } from "@nestjs/common"
import {CCOMTeacherService} from "./ccomTeacher.service"
import {CCOMTeacherController} from "./ccomTeacher.controller"
@Module({
    providers : [CCOMTeacherService],
    controllers : [CCOMTeacherController]
})
export class CCOMTeacherModule {

}