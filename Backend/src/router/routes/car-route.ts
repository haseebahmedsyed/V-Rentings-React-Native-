import express from 'express'
import {createCar,BookCar,getCar,cancelBooking,getCars} from '../controllers/car-controller'
import { authorize } from '../../middleware/auth';

const router = express.Router();

router.post('/car/create',authorize,createCar);
router.post('/car/book/:carID',authorize,BookCar);
router.delete('/car/cancelBooking/:rentID',authorize,cancelBooking);
router.get('/car/getCar/:carID',getCar);
router.get('/car/getCars',getCars);

export default router