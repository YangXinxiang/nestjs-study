import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from "@nestjs/common"
import Joi, {ObjectSchema} from "@hapi/joi";

@Injectable()
export class JoiValidatePiple implements PipeTransform {
    constructor(private scheme:ObjectSchema) {

    }
    transform(value: any, {metatype}: ArgumentMetadata) {
        console.log(`JoiValidatePiple.transform :: enter, metatype = ${metatype}`)
        const result = this.scheme.validate(value)
        if(result.error){
            console.log(`JoiValidatePiple.transform :: error`)
            console.error(result.error)
            throw new BadRequestException("Validate failed~~")
        }
        // console.log(value, arguments[1]);
        return value
    }
}