import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger, requestMiddleware} from "./middleware"
import {AuthGuard} from "./guard/AuthGuard"
import {PPExceptionFilter, AnyExceptionFilter, AnyExceptionFilter2} from "./exception"
import {RequestIntercepor} from "./interceptors/request.interceptor"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.use(logger, requestMiddleware) // 设置全局的中间件
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new AnyExceptionFilter2(httpAdapter)) // 应用全局的异常驳货的时候，需要传异常捕获的实例
  app.useGlobalInterceptors(new RequestIntercepor())
  
  
  await app.listen(3000);
}
bootstrap();
