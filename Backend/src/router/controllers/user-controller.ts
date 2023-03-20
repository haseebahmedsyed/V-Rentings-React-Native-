import { Request,Response,NextFunction } from "express";
import { User } from '../../entities/User';
import { createError } from '../../utils/error';
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import {dataSource} from '../../index'

const createWebToken=(userId:string) : string=>{
    return jwt.sign({ id: userId }, 'himynameishaseeb', {
        expiresIn: '7d'
    });
}

type opt={
    expires : Date,
    httpOnly : boolean
}

const createCookie = (user:User , statusCode:number , res:Response)=>{
    const token = createWebToken(user.id);

    const options:opt ={
        expires:new Date(Date.now() + (7* 24*60*60*1000)),
        httpOnly:true
    }
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        token,
        user
    })

}

export const createUser=async(req:Request,res:Response,next:NextFunction)=>{
    let pass =await bcrypt.hash(req.body.password,10)
    try {

        let user = await User.findOne({
            where:{
                email:req.body.email
            }
        })

        if(user){
            return next(createError(400,"Try with other email address"))
        }

        user = User.create({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password:pass
        })

        await user.save();
        createCookie(user,200,res)
    } catch (error) {
        return next(error)
    }
}

export const Login=async(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body)
    const {email,password} = req.body;

    if(!email || !password){
        return next(createError(400,"Enter credentials properly"))
    }

    const user = await dataSource.    
    createQueryBuilder()
    .select("user")
    .from(User, "user")
    .leftJoinAndSelect("user.cars", "car")
    .leftJoinAndSelect('user.rents','rent')
    .leftJoinAndSelect('car.rents','carrents')
    .leftJoinAndSelect('carrents.user','renter')
    .leftJoinAndSelect('car.images','images')
    .leftJoinAndSelect('car.user','users')
    .where('user.email = :email',{email:email})
    .getOne()

    if(!user){
        return next(createError(404,"Please signup first"))
    }

    let auth:boolean =await bcrypt.compare(password,user.password) 
    if(auth){
        createCookie(user,200,res)
    }else{
        return next(createError(404,"Invalid credentials"))
    }
}

export const Logout=(req:Request,res:Response,next:NextFunction)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({  
        success: true,
        message:"Successfully Logout"
    })


}

export const getMe=async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{

    const user = await dataSource.    
    createQueryBuilder()
    .select("user")
    .from(User, "user")
    .leftJoinAndSelect("user.cars", "car")
    .leftJoinAndSelect('user.rents','rent')
    .leftJoinAndSelect('car.images','images')
    .leftJoinAndSelect('car.rents','rents')
    .leftJoinAndSelect('car.user','owner')
    .where('user.id = :userID',{userID:req.user.id})
    .getOne()

    return res.status(200).json({user})
}

export const checkEmail=async(req:Request,res:Response,next:NextFunction)=>{
    const user = await dataSource.
    createQueryBuilder()
    .select("user")
    .from(User,'user')
    .where('user.email = :email',{email:req.params.email})
    .getOne()

    if(!user){
        return res.json({found:false})
    }

    return res.json({found:true})
}

export const deleteUser=async(req:Request,res:Response,next:NextFunction)=>{
    await dataSource.
    createQueryBuilder()
    .delete()
    .from(User,'user')
    .where('user.email = :email',{email:req.params.email})

    return res.json({deleted:true})
}