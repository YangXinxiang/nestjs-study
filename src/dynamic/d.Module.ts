/**
 * 动态模块，还是不会用啊，应用场景还是不太懂。。。
 */
import {Module, DynamicModule} from "@nestjs/common"
import {DConnect} from "./d.Connect.service"
@Module({
    providers:[DConnect],
    exports:[DConnect],
})
export class DModule{
    // static forRoot(entries = [], options?):DynamicModule {
    //     const providers = 
        
    // }
}