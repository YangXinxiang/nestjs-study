import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {DogController} from "./dog.controller"

import { AppService } from './app.service';

import {DogService} from "./dogs.service";
import {HTTP_OPTIONS} from "./http.service"
import {CatsModule} from "./cats/cats.module";
import {StudentModule} from "./students/student.module"
import {GlobalModule} from "./global/g.module"

@Module({
  imports: [GlobalModule, CatsModule, StudentModule],
   controllers: [AppController, DogController],
  providers: [AppService, HTTP_OPTIONS, DogService],
})
export class AppModule {}
