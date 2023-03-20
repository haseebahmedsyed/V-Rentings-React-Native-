import express,{ErrorRequestHandler} from 'express'
import {DataSource} from 'typeorm'
import { User } from './entities/User'
import { Rent } from './entities/Rents'
import { Car } from './entities/Car'
import { Image } from './entities/Images'
import userRouter from './router/routes/user-route'
import carRouter from './router/routes/car-route'
import rentRouter from './router/routes/rent-route'
import imageRouter from './router/routes/image-route'
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
var cors = require('cors');
const cloudinary = require('cloudinary')

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
    console.log("Hi I am error")
    console.log(err.message)
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
// app.use(bodyparser.json({limit: "5000mb"}));
// app.use(bodyparser.urlencoded({limit: "5000mb", extended: true}));
app.use(bodyparser.json({limit: "500000000mb"}));
app.use(bodyparser.urlencoded({limit: "500000000mb", extended: true, parameterLimit:5000000}));
app.use('/api',userRouter)
app.use('/api',carRouter)
app.use('/api',rentRouter)
app.use('/api',imageRouter)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(ErrorHandler)

cloudinary.config({
    cloud_name: "djwhtymxh",
    api_key: "498669285996934",
    api_secret: "gWRb_l_GDqE5qCBmU9os-Oj4bEY"
  });

app.listen(5000,()=>{
    console.log("Listening to port 5000...")
    dataSource.connect().then(()=>console.log("Connected to database")).catch(e=>console.log(e))
})
