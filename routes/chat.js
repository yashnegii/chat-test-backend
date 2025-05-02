import {Router} from 'express';
import {chatPostHandler} from '../controllers/chatController.js';

const router = Router();


router.get('/send', chatPostHandler);


export default router;
