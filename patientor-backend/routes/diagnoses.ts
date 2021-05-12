import express,{Request,Response,NextFunction} from 'express';
import diagnosisService from '../services/diagnosisService'; 
import {toNewDiagnosis} from '../utils/dataParser/diagnosis';
const router = express.Router();


//eslint-typescript complain about no misused promise one way to work around is to use promise+then instead of async/await
// eslint-disable-next-line
router.get('/', async (_req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const allDiagnosis = await diagnosisService.getAllDiagnoses(); 
        res.json(allDiagnosis);
        return;    
    } catch (error) {
        return next(error);   
    }
    //this code below doesn't trigger the  linting error.However, it looks ugly. should i just disable this rule
    /*
        (async () => {
            try{
                const allDiagnosis = await diagnosisService.getAllDiagnoses(); 
                res.json(allDiagnosis);
                return;
            }catch(error){
                return next(error);
            }
        })();
    */
});

// eslint-disable-next-line
router.post('/diagnosis', async(req:Request, res:Response,next:NextFunction):Promise<void> => {
    const decodedToken = req.decodedToken;
    try{
        if(!decodedToken || !decodedToken.id){
            res.status(400).json({error:'token missing or invalid'});
            return;
        }
        // eslint-disable-next-line
        const newDiagnosisEntry = toNewDiagnosis(req.body) ;
        const addedDiagnosis = await diagnosisService.addDiagnosis(newDiagnosisEntry);
        res.json(addedDiagnosis);
        return;
    }catch(error){
        return next(error);
    }

});

export default router;