export class CatsDto {
    readonly name:string;
    readonly address:string;
    readonly age:number;
    readonly info?:any;
}

export class CreateCatDto {
    readonly name: string;
    readonly age: number;
    readonly breed: string;
  }