import { Request, Response, NextFunction } from "express";
import { Rent } from "../../entities/Rents";
import { createError } from '../../utils/error';
import { dataSource } from '../../index'


export const cancelBooking=async(req : Request,res : Response,next : NextFunction)=>{
    await dataSource
    .createQueryBuilder()
    .delete()
    .from(Rent,'rent')
    .where('id = :rentID',{rentID:req.params.rentID})
    .execute()

    res.status(200).send({success:true})
}

