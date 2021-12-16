import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger} from "./middleware/logger"
import {PPExceptionFilter, AnyExceptionFilter, AnyExceptionFilter2} from "./exception"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AnyExceptionFilter2(httpAdapter)) // 应用全局的异常驳货的时候，需要传异常捕获的实例
  app.use(logger) // 设置全局的中间件
  await app.listen(3000);
}
bootstrap();
