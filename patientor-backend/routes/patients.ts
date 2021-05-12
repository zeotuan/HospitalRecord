import express,{Request,Response,NextFunction} from 'express';
import patientService from '../services/patientService';
import {toNewPatient} from '../utils/dataParser/patient';
import {toNewEntry} from '../utils/dataParser/entry';
const router = express.Router();

router.get('/', async (_req:Request, res:Response, next:NextFunction) => {
    try {
        const patients = await patientService.getNonSensitiveEntries();
        return res.send(patients);    
    } catch (error) {
        return next(error);
    }
    
});

router.get('/:id', async (req:Request,res:Response,next:NextFunction) => {
    try {
        const patient = await patientService.findById(req.params.id);
        if(patient){
            return res.send(patient);
        }
        return res.sendStatus(404);
    } catch (error) {
       return next(error); 
    }
});

router.post('/', async (req:Request,res:Response,next:NextFunction) => {
    try {
        const newPatientEntry = toNewPatient(req.body) ;
        const addedPatient = await patientService.addPatient(newPatientEntry);
        if(addedPatient){
            return res.json(addedPatient);
        }
        return res.status(400).json({error:'patient was not added'});
    } catch (error) {
        return next(error);
    }
});

router.patch('/:patientId/entries/', async (req:Request,res:Response, next:NextFunction) => {
    try{
        const newEntry = toNewEntry(req.body);
        const updatedPatient = await patientService.addEntry(req.params.patientId,newEntry);
        if(updatedPatient){
            return res.json(updatedPatient);
        }
        return res.status(404).json({error:'no patient was updated'});
        
    }catch(error){
        return next(error);
    }
});

export default router;
