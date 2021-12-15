/**
 * 练习动态模块，参考自： 
 * https://docs.nestjs.com/fundamentals/dynamic-modules
 * https://docs.nestjs.cn/8/modules?id=%e5%8a%a8%e6%80%81%e6%a8%a1%e5%9d%97
 */


import {Module, DynamicModule} from "@nestjs/common"
import {ConfigService} from "./config.service"
@Module({})
export class ConfigModule{
    constructor(private readonly configService: ConfigService) {}

    static register(opsions={}) : DynamicModule {
        return {
            module: ConfigModule,
            providers : [
                // 这是自定义提供者的基本结构，使用的时候用 @Inject("CONFIG_OPTION") config注入
                {
                    provide : "CONFIG_OPTION",
                    useValue : opsions,
                },
                ConfigService,
            ],
            exports : [ConfigService],
        }
    }
}
