import express,{Request,Response,NextFunction} from 'express';
import diagnosisService from '../services/diagnosisService'; 
import {toNewDiagnosis} from '../utils/dataParser/diagnosis';
const router = express.Router();

 
router.get('/', async (_req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const allDiagnosis = await diagnosisService.getAllDiagnoses(); 
        res.json(allDiagnosis);
        return;
    } catch (error) {
        return next(error); 
    }
    
});

router.post('/diagnosis', async(req:Request, res:Response,next:NextFunction):Promise<void> => {
    const body = req.body;
    const decodedToken = req.decodedToken;
    try{
        if(!decodedToken || !decodedToken.id){
            res.status(400).json({error:'token missing or invalid'});
            return;
        }
        const newDiagnosisEntry = toNewDiagnosis(body) ;
        const addedDiagnosis = await diagnosisService.addDiagnosis(newDiagnosisEntry);
        res.json(addedDiagnosis);
        return;
    }catch(error){
        return next(error);
    }

});
export default router;