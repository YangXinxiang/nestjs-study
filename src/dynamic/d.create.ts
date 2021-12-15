import {Injectable} from "@nestjs/common"
@Injectable()
export class DConnect {
    getConnects(): number[] {
        return [1,2,3]
    }
}