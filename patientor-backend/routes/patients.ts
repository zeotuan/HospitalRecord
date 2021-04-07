import express from 'express';
import patientService from '../services/patientService';
import {toNewPatient} from '../utils/patient';
import {toNewEntry} from '../utils/entry'
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
})

router.get('/:id', (req,res) => {
    const patient = patientService.findById(req.params.id);
    if(patient){
        res.send(patient);
    }else{
        res.sendStatus(404);
    }
})

router.post('/', (req,res) => {
    try {
        const newPatientEntry = toNewPatient(req.body) ;
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.patch('/:authorId/entries/', (req,res) => {
    try{
        const newEntry = toNewEntry(req.body);
        patientService.addEntry(req.params.authorId,newEntry);

    }catch(error){
        res.status(400).send(error.message)
    }
})

export default router;
