import express,{Request,Response,NextFunction} from 'express';
import userService from '../services/userService';
import {toNewUser,toUser} from '../utils/dataParser/user';
const router = express.Router();

router.post('/signUp', async (req:Request,res:Response,next:NextFunction) => {
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
});

router.post('/login', async (req:Request,res:Response,next:NextFunction) => {
    const body = req.body;
    try {
        const user = toUser(body);
        const result = await userService.login(user);
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
});


router.get('/', async (req:Request, res:Response, next:NextFunction) => {
    try {
        if(!req.decodedToken || !req.decodedToken.id){
            return res.status(400).json({error:'missing or invalid token'});
        }
        const allUser = await userService.getAll();
        return res.json(allUser);
    } catch (error) {
        return next(error);
    }
});

export default router;