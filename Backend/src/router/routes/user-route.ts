import express from 'express'
import {createUser,Login,Logout,getMe,checkEmail,deleteUser} from '../controllers/user-controller'
import { authorize } from '../../middleware/auth';
import {validateSchema} from '../../middleware/zodValidation'
import { userSchema } from '../../schema/user';


const router = express.Router();

router.post('/user/create',validateSchema(userSchema),createUser);
router.post('/user/login',Login);
router.post('/user/logout',authorize,Logout);
router.get('/user/getMe',authorize,getMe);
router.get('/user/checkEmail/:email',checkEmail);
router.delete('/user/deleteUser/:email',deleteUser);

export default router