import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm"
import { AppController } from './app.controller';
import {DogController} from "./dog.controller"

import { AppService } from './app.service';

import {DogService} from "./dogs.service";
import {HTTP_OPTIONS} from "./http.service"
import {CatsModule} from "./cats/cats.module";
import {StudentModule} from "./students/student.module"
import {GlobalModule} from "./global/g.module"
import {ConfigModule} from "./config/config.module"
import {LoggerMiddle} from "./middleware/LoggerMiddleware"
import {PPExceptionFilter} from "./exception"
import {logger} from "./middleware/logger"
import {CustomerModule} from "./customer/CustomerModule"
import {CCOMTeacherModule} from "./ccom-fz-teacher/ccomTeacher.moduler"
import {User} from "./users/user.entity"
import {UsersModule} from "./users/user.module"
@Module({
  imports: [
    GlobalModule, 
    CatsModule, 
    StudentModule, 
    CustomerModule, 
    ConfigModule.register({folder: "xxx"}), 
    CCOMTeacherModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'q11111111',
      database: 'nestjs-study',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
   controllers: [AppController, DogController],
  providers: [AppService, HTTP_OPTIONS, DogService, {
    provide : "INJECT_EXCEPTION",
     useClass: PPExceptionFilter,
    // useValue :"test"
  }],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddle, logger) // 可以应用多个中间件
    .forRoutes("cats") // 为某个路由、控制器设置中间件
  }
}
