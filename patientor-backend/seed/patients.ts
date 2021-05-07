import mongoose from 'mongoose';
import config from '../utils/config';
import patientsEntry from '../data/patients';
import patientModel from '../model/patients';
import entryModel from '../model/entry';
import DiagnosisModel from '../model/diagnosis';
import PatientModel from '../model/patients';
import EntryModel from '../model/entry';


mongoose.set('debug', true);
const mongoUrl = config.MONGODB_URI? config.MONGODB_URI : '';

mongoose.connect(mongoUrl, {})
    .then(_result => {
        console.log(`connected to mongoDB with URI ${mongoUrl}`);
        return seedingPatientAndEntries();
    }).then(()=>{
        console.log('finished seeding patients and entries');
    })
    .catch(error => {
        console.log(error);
        mongoose.disconnect();
    })


const seedingPatientAndEntries = async () => {
    await patientModel.deleteMany({});
    await EntryModel.deleteMany({});
    for(const patientEntry of patientsEntry){
        const {entries, ...patientInfo} = patientEntry
        const newPatient = new PatientModel({
            ...patientInfo
        })
        for(const entry of entries){
            const {diagnosisCodes, ...other} = entry
            const newEntry = new entryModel({
                ...other,
            })
            if(diagnosisCodes){
                for(const diagCode of diagnosisCodes){
                    const diagnosis = await DiagnosisModel.findOne({code:diagCode});
                    if(diagnosis){
                        newEntry.diagnosisCodesIds.push(diagnosis.id);
                    }
                }
            }
            await newEntry.save();
            newPatient.entries.push(newEntry.id);
        }
        await newPatient.save();
    }
    await mongoose.disconnect();
}

