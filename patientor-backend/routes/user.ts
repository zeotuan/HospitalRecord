import express,{Request,Response,NextFunction} from 'express';
import userService from '../services/userService';
import {toNewUser} from '../utils/dataParser/user';
const router = express.Router();

router.post('/', async (req:Request,res:Response,next:NextFunction) => {
    try {
        const newUserEntry = await toNewUser(req.body);
        const addedUser = await userService.addUser(newUserEntry);
        if(addedUser){
            return res.json(addedUser);
        }
        return res.status(400).json({error:'user not added'});
    } catch (error) {
        return next(error);
    }
})

export default router;