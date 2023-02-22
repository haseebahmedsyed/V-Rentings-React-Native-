import express from 'express'
import {uploadCarImage,deleteImages,getImages} from '../controllers/image-controller'
// import { authorize } from '../../middleware/auth';
// import {validateSchema} from '../../middleware/zodValidation'
// import { carSchema } from '../../schema/car';


const router = express.Router();

router.post('/image/upload/:id',uploadCarImage)
router.delete('/image/deleteImages',deleteImages)
router.get('/image/getAllImages',getImages)

export default router