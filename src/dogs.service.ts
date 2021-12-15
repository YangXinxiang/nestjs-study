// import {Injectable}  from "@nestjs/common"
import { Injectable, Inject } from '@nestjs/common';
import {HTTP_OPTIONS} from "./http.service"
// @Injectable()
// export class DogService {
//     run():Promise<any> {
//         return new Promise((resolve, reject)=> {
//             resolve("DogService.run")
//         })
//     }
// }



@Injectable()
export class DogService<T> {
//   @Inject('HTTP_OPTIONS')
//   private readonly httpClient: HTTP_OPTIONS<any>;

 constructor(private readonly httpClient: HTTP_OPTIONS<any>){}

  run():Promise<any> {
    return new Promise((resolve, reject)=> {
        resolve("DogService.run, "+this.httpClient.getInfo())
    })
}
}