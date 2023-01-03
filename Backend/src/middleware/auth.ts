import { Request,Response,NextFunction } from "express";
const jwt = require('jsonwebtoken')
import { createError } from "../utils/error";
import { User } from "../entities/User";


export const authorize=async(req:Request,res:Response,next:NextFunction)=>{
    let cookie = req.rawHeaders.filter((c)=>c.startsWith('token')) 
    let token = cookie[0].slice(6)

    if(!token) {
        return next(createError(401,"Login First To Access This Resource"));
    }

    const decode = jwt.verify(token,'himynameishaseeb');
    console.log(decode)
    req.user = await User.findOne({
        where:{
            id:decode.id
        }
    });

    next();



}