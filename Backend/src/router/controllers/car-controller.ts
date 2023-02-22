import { Request, Response, NextFunction } from "express";
import { Car } from '../../entities/Car';
import { User } from '../../entities/User';
import { Rent } from "../../entities/Rents";
import { createError } from '../../utils/error';
import { dataSource } from '../../index'
import { Fiteration } from "../../utils/Filteration";
import { calculateDistance } from "../../utils/calDistance";


export const getCars=async(req: Request, res: Response, next: NextFunction)=>{
    const { startDate, endDate } = req.body;
    const {latitude,longitude} = req.query;

    if(startDate < new Date(Date.now()).getTime()){
        return next(createError(400,"Please select valid date"))
    }

    let cars = await dataSource.createQueryBuilder()
    .select('car')
    .from(Car,'car')
    .leftJoinAndSelect('car.rents','rents')
    .getMany();


    let carsFiltered:Car[] = [];

    for(let i= 0 ; i<cars.length ; i++){
        let bool = false;
        for(let j = 0 ; j<cars[i].rents.length ; j++) {
            if(Number(startDate) >= Number(cars[i].rents[j].startDate) && Number(startDate) <= Number(cars[i].rents[j].endDate)){
                bool=true;
            }
        }

        if(bool==false && Number(calculateDistance(Number(cars[i].location.latitude),Number(cars[i].location.longitude),Number(latitude),Number(longitude)))<=15){
            carsFiltered.push(cars[i])
        }
    }
    
    let carsResulted = await new Fiteration(carsFiltered,req.query).sortByPrice().sortByRating().sortByDistance()
    .priceRange().filterTransmission().filterByPassengers().filterBySize()
    res.json({cars:carsResulted.cars})

}


export const cancelBooking=async(req: Request, res: Response, next: NextFunction)=>{
    await dataSource.createQueryBuilder()
    .delete()
    .from(Rent,'rent')
    .where('rent.id =:rentID',{rentID:req.params.rentID})
    .execute()

    res.json({
        success:true
    })
}

export const getCar=async(req: Request, res: Response, next: NextFunction)=>{
    console.log(req.params.carID)
    let car = await dataSource.createQueryBuilder()
    .select('car')
    .from(Car,'car')
    .leftJoinAndSelect('car.rents','rents')
    .leftJoinAndSelect('rents.user','renter')
    .leftJoinAndSelect('car.user','owner')
    .leftJoinAndSelect('car.images','images')
    .where('car.id = :carID',{carID:req.params.carID})
    .getOne()

    res.status(200).json({
        success:true,
        car
    })
}

export const BookCar = async (req: Request, res: Response, next: NextFunction) => {
    const { startDate, endDate } = req.body;
    try {

        if(Number(startDate) < new Date(Date.now()).getTime() ||  Number(endDate) < new Date(Date.now()).getTime()){
            return next(createError(404, "Please select appropriate dates"))
        }

        let car = await dataSource.createQueryBuilder()
        .select('car')
        .from(Car,'car')
        .leftJoinAndSelect('car.rents','rent')
        .where('car.id = :carID',{carID:req.params.carID})
        .getOne()

        if (!car) {
            return next(createError(404, "No car exist"))
        }
        let isBooked = car.rents.some((item) => Number(startDate) >= Number(item.startDate) && Number(startDate) <= Number(item.endDate));
        if (isBooked) {
            return next(createError(400, "The car has already been booked"));
        }

        let one_day=1000*60*60*24;
        let difference_ms = endDate - startDate;
        let days= Math.round(difference_ms/one_day); 
        let rentPrice = days*car.price

        let rent = Rent.create({
            user: req.user,
            car_id: car.id,
            startDate: startDate,
            endDate: endDate,
            rentPrice:rentPrice,
            days:days
        })

        await rent.save();

        car.rents = [...car.rents,rent];
        await car.save();
        
        let user = await dataSource.createQueryBuilder()
        .select('user')
        .from(User,'user')
        .leftJoinAndSelect('user.rents','rent')
        .where('user.id = :userID',{userID:req.user.id})
        .getOne()

        if (!user) {
            return next(createError(404,"Login first to a access the resource"))
        }

        let rents = [...user.rents, rent];
        user.rents = rents;
        await user.save();
        res.json({
            success: true,
            message: "Successfully Booked",
            car
        })

    } catch (error) {
        return next(error)
    }


}


export const createCar = async (req: Request, res: Response, next: NextFunction) => {
    try {

        let user = await dataSource.createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .leftJoinAndSelect('user.cars','car')
            .where('user.id = :userID', { userID: req.user.id })
            .getOne()

        if (!user) {
            return next(createError(404, "No user exist"))
        }

        let car = Car.create({
            name: req.body.name,
            passengers: req.body.passengers,
            bags: req.body.bags,
            price: req.body.price,
            // rating: req.body.rating,
            rating: '0.0',
            location: req.body.location,
            user: user,
            type:req.body.type
        })

        await car.save();
        let cars = [...user.cars, car];
        user.cars = cars;
        await user.save()
        res.json({ success: true, car })


    } catch (error) {
        return next(error)
    }
}

export const getAllCars=async(req:Request,res:Response,next:NextFunction)=>{
    const cars = await dataSource
    .createQueryBuilder()
    .select('car')
    .from(Car,'car')
    .leftJoinAndSelect('car.rents','rents')
    .leftJoinAndSelect('car.images','images')
    .getMany()

    res.status(200).json({cars})
}

export const updateCar=async(req:Request,res:Response,next:NextFunction)=>{
    await dataSource
    .createQueryBuilder()
    .update(Car)
    .set({...req.body})
    .where('id =:carID',{carID:req.params.carID})
    .execute();

    res.status(200).json({success:true})
}

export const deleteCar=async(req:Request,res:Response,next:NextFunction)=>{
    console.log('deleting...')
    await dataSource
    .createQueryBuilder()
    .delete()
    .from(Car,'car')
    .where('id =:carID',{carID:req.params.carID})
    .execute();

    res.status(200).json({success:true})
}

