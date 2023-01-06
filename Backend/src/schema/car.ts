import {z} from 'zod'
import { carType,Transmission } from '../entities/Car'


export const carSchema = z.object({
    type:z.nativeEnum(carType,{
        required_error:"type is required"
    }),

    name:z.string({
        required_error:"name required"
    }).min(3,"Name must be atleast 3 characters"),

    passengers:z.number({
        required_error:"passengers info is required"
    }).min(2,"car should afford atleast 2 passangers").max(7,"car should afford atleast 7 passangers"),

    bags:z.number({
        required_error:"bags info is required"
    }).min(2,"car should afford atleast 2 bags").max(5,"car should afford atleast 5 bags"),

    price:z.number({
        required_error:"rent price is mandatory"
    }).min(100,"Rent shoul be atleast 100$"),

    location:z.object({
        latitude:z.string(),
        longitude:z.string()
    }),

    transmission :z.nativeEnum(Transmission).optional(),

    

})