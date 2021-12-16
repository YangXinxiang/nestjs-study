import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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

@Module({
  imports: [GlobalModule, CatsModule, StudentModule, ConfigModule.register({folder: "xxx"})],
   controllers: [AppController, DogController],
  providers: [AppService, HTTP_OPTIONS, DogService, {
    provide : "INJECT_EXCEPTION",
    useClass: PPExceptionFilter,
    useValue :"test"
  }],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddle, logger) // 可以应用多个中间件
    .forRoutes("cats") // 为某个路由、控制器设置中间件
  }
}
