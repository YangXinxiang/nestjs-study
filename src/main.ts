import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger} from "./middleware/logger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger) // 设置全局的中间件
  await app.listen(3000);
}
bootstrap();
