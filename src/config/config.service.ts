import {Injectable, Inject} from "@nestjs/common";
import * as dotenv from "dotenv"
import * as fs from "fs";
// import path from "path"


@Injectable()
export class ConfigService{
    constructor(@Inject("CONFIG_OPTION") config) {
        const options  = { folder : "./envConfig"}
        const filePath = `${process.env.NODE_ENV || "develop"}.env`
        // const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
        console.log(`ConfigService.constructor :: enter.`)
        console.log(config)
        console.log(process.env.NODE_ENV)
        console.log(__dirname, options.folder, filePath)
    }
    getConfig(path=""){

    }
}