import express from 'express'
import {createUser,Login,Logout,getMe} from '../controllers/user-controller'
import { authorize } from '../../middleware/auth';
const router = express.Router();

router.post('/user/create',createUser);
router.post('/user/login',Login);
router.post('/user/logout',authorize,Logout);
router.get('/user/getMe',authorize,getMe);

export default router