import express from 'express'
import {cancelBooking} from '../controllers/rent-controller'
import { authorize } from '../../middleware/auth';
// import {validateSchema} from '../../middleware/zodValidation'
// import { userSchema } from '../../schema/user';

const router = express.Router();

router.delete('/rent/cancelBookng/:rentID',cancelBooking)
// router.delete('/rent/deleteImages',deleteImages)

export default router