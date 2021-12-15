import {Injectable} from "@nestjs/common"
@Injectable()
export class GlobalService{
    run():void{
       console.log(`GlobalService.run :: enter`);
    }
    getConnectIPs():any[]{
        console.log(`GlobalService.getConnectIPs :: enter`);
        return [1,2,3]
    }
}