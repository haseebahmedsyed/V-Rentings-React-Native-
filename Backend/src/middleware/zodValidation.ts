import {Request,Response,NextFunction} from 'express'
import { createError } from '../utils/error';
import {z,AnyZodObject} from 'zod'

export const validateSchema=(schema:AnyZodObject)=>async(req:Request, res:Response,next:NextFunction) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        // console.log(error.errors[0].message)
        return next(createError(400,error.errors[0].message))
    }
}