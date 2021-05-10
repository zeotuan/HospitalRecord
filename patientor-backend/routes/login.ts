import express,{Request,Response,NextFunction} from 'express';
import userService from '../services/userService';
import { toUser } from '../utils/dataParser/user';
const router = express.Router();

router.post('/', async (req:Request,res:Response,next:NextFunction) => {
    const body = req.body;
    try {
        const user = toUser(body);
        const result = await userService.login(user);
        return res.json(result);
    } catch (error) {
        return next(error);
    }
})