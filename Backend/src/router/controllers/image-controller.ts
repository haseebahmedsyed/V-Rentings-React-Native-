import { Request, Response, NextFunction } from "express";
import { Image } from "../../entities/Images";
import { Car } from '../../entities/Car';
import { createError } from '../../utils/error';
import { dataSource } from '../../index'
const cloudinary = require('cloudinary');

export const uploadCarImage=async(req : Request,res : Response,next : NextFunction)=>{
    const {images} = req.body
    try {
        const car1 = await dataSource.createQueryBuilder()
        .select('car')
        .from(Car,'car')
        .leftJoinAndSelect('car.images','images')
        .where('car.id = :id',{id:req.params.id})
        .getOne()
    
        if(car1 instanceof Car){
            let deletePromise = new Promise(async(res,rej)=>{
                try {
                    for(let i = 0 ; i< car1.images.length ; i++){
                        await  dataSource.createQueryBuilder()
                        .delete()
                        .from(Image)
                        .where('id = :id',{id:car1.images[i].id})
                        .execute()
                    }                    
                    res(true)
                } catch (error) {
                    rej(createError(400,"Please try again"))
                }
            })

            let imgs:Image[] = []
            for(let j = 0 ; j< images.length ; j++){
                let image=await Image.create({
                    public_id: images[j].public_id,
                    url: images[j].url,
                    car:car1
                }).save()             
                imgs.push(image)
            }
            deletePromise.then(async(val)=>{
                car1.images = imgs
                await car1.save()
                imgs=[];
                res.status(200).send({success:true})
            })
            .catch(()=>{
                next(createError(400,"Something Went wrong please try again"))
            })
        }
    } catch (error) {
        console.log(error)
        next(createError(400,'Something went wrong try again'))        
    }
}

export const deleteImages=async(req : Request,res : Response,next : NextFunction)=>{
    await dataSource.createQueryBuilder()
    .delete()
    .from(Image)
    .execute()
    res.status(200).send({success:true})
}
export const getImages=async(req : Request,res : Response,next : NextFunction)=>{
    let imgs = await dataSource.createQueryBuilder()
    .select('images')
    .from(Image,'images')
    .getMany()
    res.status(200).send({success:true,images:imgs})
}

