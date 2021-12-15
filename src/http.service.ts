// import {Injectable}  from "@nestjs/common"
import { Injectable, Inject } from '@nestjs/common';
// @Injectable()
// export class DogService {
//     run():Promise<any> {
//         return new Promise((resolve, reject)=> {
//             resolve("DogService.run")
//         })
//     }
// }



@Injectable()
export class HTTP_OPTIONS<T> {
  public static Options = {
      URL: "hhhh",
      METHOD : "POST"
  }

  getInfo(){
      return "~~~HTTP_OPTIONS~~~~~"
  }
}