import express,{Request,Response,NextFunction, request} from 'express'
import diagnosisService from '../services/diagnosisService' 
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import {toNewDiagnosis} from '../utils/dataParser/diagnosis';

const router = express.Router()

router.get('/', async (_req:Request,res:Response,next:NextFunction) => {
    try {
        return res.send(await diagnosisService.getAllDiagnoses());    
    } catch (error) {
        return next(error)
    }
    
})

router.post('/diagnosis', async(req:Request, res:Response,next:NextFunction) => {
    const body = req.body;
    try{
        const decodedToken:any = jwt.verify(request.token,config.JWT_SECRET);
        if(!request.token || !decodedToken.id){
            return res.status(400).json({error:'token missing or invalid'});
        }
        const newDiagnosisEntry = toNewDiagnosis(body) ;
        const addedDiagnosis = await diagnosisService.addDiagnosis(newDiagnosisEntry);
        return res.json(addedDiagnosis);
        
    }catch(error){
        return next(error);
    }

})
export default router