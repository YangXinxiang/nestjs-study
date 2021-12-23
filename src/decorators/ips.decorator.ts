import {SetMetadata} from "@nestjs/common"
// 用泛型尽量通用。
export const IPs = <T>(...ips: T[]) => SetMetadata("ips", ips)