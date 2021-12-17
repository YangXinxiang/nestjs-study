
// import Joi, {Schema}  from "joi"
const Joi = require('@hapi/joi'); // 为嘛用import不行呢。。。。先不纠结，搞这种极度不推荐的混合模式吧
export const createCatSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    desc: Joi.string(),
    any:Joi.any()
})
