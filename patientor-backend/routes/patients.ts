import express,{Request,Response,NextFunction} from 'express';
import patientService from '../services/patientService';
import {toNewPatient} from '../utils/dataParser/patient';
import {toNewEntry} from '../utils/dataParser/entry'
const router = express.Router();

router.get('/', async (_req:Request, res:Response, next:NextFunction) => {
    try {
        const patients = await patientService.getNonSensitiveEntries();
        return res.send(patients);    
    } catch (error) {
        return next(error);
    }
    
})

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
})

router.post('/', async (req:Request,res:Response,next:NextFunction) => {
    try {
        const newPatientEntry = toNewPatient(req.body) ;
        const addedEntry = await patientService.addPatient(newPatientEntry);
        return res.json(addedEntry);
    } catch (error) {
        return next(error)
    }
})

router.patch('/:patientId/entries/', async (req,res) => {
    try{
        const newEntry = toNewEntry(req.body);
        const updatedPatient = await patientService.addEntry(req.params.patientId,newEntry);
        res.json(updatedPatient);
    }catch(error){
        res.status(400).send(error.message)
    }
})

export default router;
