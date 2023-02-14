import express,{ErrorRequestHandler} from 'express'
import {DataSource} from 'typeorm'
import { User } from './entities/User'
import { Rent } from './entities/Rents'
import { Car } from './entities/Car'
import { Image } from './entities/Images'
import userRouter from './router/routes/user-route'
import carRouter from './router/routes/car-route'
const cookieParser = require('cookie-parser');
var cors = require('cors');
const corsOptions ={
    // origin:'*', 
    origin:true, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const app = express()

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'sky@line#123',
    database: 'rent',
    entities:[User,Rent,Car,Image],
    synchronize: true,
})

const ErrorHandler : ErrorRequestHandler=(err,req,res,next)=>{
    const errorStatus = err.status as number || 500;
    const errorMessage = err.message as string || "something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
}
app.use(express.json())
app.use(ErrorHandler)
app.use('/api',userRouter)
app.use('/api',carRouter)
app.use(cookieParser())
app.use(cors(corsOptions))


app.listen(5000,()=>{
    console.log("Listening to port 5000...")
    dataSource.connect().then(()=>console.log("Connected to database")).catch(e=>console.log(e))
})
