import express from 'express';
import patientService from '../services/patientService';
import {toNewPatient} from '../utils/patient';
import {toNewEntry} from '../utils/entry'
const router = express.Router();

router.get('/', async (_req, res) => {
    const patients = await patientService.getNonSensitiveEntries();
    res.send(patients);
})

router.get('/:id', async (req,res) => {
    const patient = await patientService.findById(req.params.id);
    
    if(patient){
        res.send(patient);
    }else{
        res.sendStatus(404);
    }
})

router.post('/', async (req,res) => {
    try {
        const newPatientEntry = toNewPatient(req.body) ;
        const addedEntry = await patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error) {
        res.status(400).send(error.message);
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
