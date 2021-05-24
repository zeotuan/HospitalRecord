import express,{Request,Response,NextFunction} from 'express';
import userService from '../services/userService';
import {toNewUser,toUser} from '../utils/dataParser/user';
const router = express.Router();

// eslint-disable-next-line
router.post('/signUp', async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        // eslint-disable-next-line
        const newUserEntry = await toNewUser(req.body);
        const addedUser = await userService.addUser(newUserEntry);
        if(addedUser){
            res.json(addedUser);
            return;
        }
        res.status(404).json({error:'sign up fail'});
        return;
    } catch (error) {
        return next(error);
    }
});
// eslint-disable-next-line
router.post('/login', async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    
    try {
        // eslint-disable-next-line
        const user = toUser(req.body);
        const result = await userService.login(user);
        res.status(200).json(result);
        return;
    } catch (error) {
        return next(error);
    }
});

// eslint-disable-next-line
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


router.get('/withToken', async (req:Request, res:Response, next:NextFunction) => {
    try{
        if(!req.decodedToken || !req.decodedToken.id){
            return res.status(400).json({error:'missing or invalid token'});
        }

        const user = await userService.getuserById(req.decodedToken.id);
        if(user){
            res.json(user);
            return;
        }
        res.status(404).json({error:'cannot find user with that token'});

    }catch(error){
        return next(error);
    }
})


export default router;