import {Router} from 'express';
import { signup , signin, signout} from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/signout').get(signout);


export default router;
