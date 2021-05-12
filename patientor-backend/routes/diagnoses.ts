import express,{Request,Response,NextFunction} from 'express'
import diagnosisService from '../services/diagnosisService' 
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
    const decodedToken = req.decodedToken;
    try{
        if(!decodedToken || !decodedToken.id){
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