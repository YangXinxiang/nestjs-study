
/**
 * 基于核心基类来创建过滤器
 * 这个要注意，实例化类的时候，需要传入一个adapter参数，否则会报错。
 *   const { httpAdapter } = app.get(HttpAdapterHost); // 这个httpAdapter是干啥用的捏？？？
 *   app.useGlobalFilters(new AnyExceptionFilter2(httpAdapter)) // 应用全局的异常驳货的时候，需要传异常捕获的实例
 */
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AnyExceptionFilter2 extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
    console.log(`AnyExceptionFilter2.catch :: got exception....`)
  }
}