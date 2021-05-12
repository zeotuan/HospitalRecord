import express,{Request,Response,NextFunction} from 'express';
import patientService from '../services/patientService';
import {toNewPatient} from '../utils/dataParser/patient';
import {toNewEntry} from '../utils/dataParser/entry';
const router = express.Router();

// eslint-disable-next-line
router.get('/', async (_req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        const patients = await patientService.getNonSensitiveEntries();
        res.send(patients);
        return;    
    } catch (error) {
        return next(error);
    }
    
});
// eslint-disable-next-line
router.get('/:id', async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const patient = await patientService.findById(req.params.id);
        if(patient){
            res.send(patient);
            return;
        }
        res.sendStatus(404).json({error:'no matching patient'});
        return;
    } catch (error) {
       return next(error); 
    }
});
// eslint-disable-next-line
router.post('/', async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const newPatientEntry = toNewPatient(req.body) ;
        const addedPatient = await patientService.addPatient(newPatientEntry);
        if(addedPatient){
            res.json(addedPatient);
            return;
        }
        res.status(400).json({error:'adding patient fail'});
        return;
    } catch (error) {
        return next(error);
    }
});
// eslint-disable-next-line
router.patch('/:patientId/entries/', async (req:Request,res:Response, next:NextFunction):Promise<void> => {
    try{
        const newEntry = toNewEntry(req.body);
        const updatedPatient = await patientService.addEntry(req.params.patientId,newEntry);
        if(updatedPatient){
            res.json(updatedPatient);
            return;
        }
        res.status(404).json({error:'updating patient fail'});
        return;
    }catch(error){
        return next(error);
    }
});

export default router;
