import {Injectable, Post, Body, Res, Get} from "@nestjs/common"
import {Response} from "express";
import {Cat} from "./interfaces/cat.interface";

@Injectable()
export class CatsService{
    private readonly cats: Cat[] = [];
    create(catInfo:Cat, res: Response) :Promise<any> {
        return new Promise((resolve, reject)=>{
            setTimeout(()=> {
                this.cats.push(catInfo)
                res.send({
                    status:200,
                    desc : "create success"
                })
            },1000)
        })
    }

    getByIndex(index:number): Cat{
        console.log(`CatsService.getByIndex :: enter, index = ${index}, len = ${this.cats.length}`)
        return this.cats[index]
    }
}