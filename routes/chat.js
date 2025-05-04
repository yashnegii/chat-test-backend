import {Router} from 'express';
import {getUserHandler} from '../controllers/chatController.js';

const router = Router();


router.get('/getuser', getUserHandler);


export default router;
