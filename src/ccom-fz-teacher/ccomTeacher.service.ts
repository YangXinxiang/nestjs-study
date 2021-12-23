import {Injectable} from "@nestjs/common"
import fs from "fs"
// import path from 'path';
const path = require("path")
import {recordResult} from "../util/FileUtil"
@Injectable() 
export class CCOMTeacherService {
    async getList(fullPath:string, type="json") {
        return new Promise((resolve, reject) => {
            // 哈哈，哈哈，哈哈，这本地路径，先随便遮掩搞一下了，更牛逼的是 import 和 require 同时用。。。，哈哈哈哈
            
            const data = require(fullPath)
            // console.log(data)
            resolve(data)
        })
    }

    async updateList(fullFileName:string, data:any, type="json") {
        return recordResult(fullFileName, data, false);
    }
}

// import fs from "fs";


