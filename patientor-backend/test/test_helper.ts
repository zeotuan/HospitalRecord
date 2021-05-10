import Diagnosis from '../model/diagnosis';
import Entry,{EntryDocument, HealthCheckEntry, HospitalEntry, OcculationalHealthcareEntry} from '../model/entry';
import Patient from '../model/patients';
import {Patient as patient, Diagnosis as diagnosis} from '../types/types'

const diagnosInDb = async () => {
    const diagnosis = await Diagnosis.find({});
    return diagnosis.map(d => d.toJSON())
}

const entryInDb = async () => {
    const entries = await Entry.find({});
    return entries.map(e => e.toJSON());
}

const patientInDb = async () => {
    const patients = await Patient.find({});
    return patients.map(p => p.toJSON());
}

export const seedingPatientAndEntries = async (patientEntries:patient[]) => {
    await Patient.deleteMany({});
    await Entry.deleteMany({});
    for(const patientEntry of patientEntries){
        const {entries, ...patientInfo} = patientEntry
        const newPatient = new Patient({
            ...patientInfo
        })
        for(const entry of entries){
            const {diagnosisCodes, ...other} = entry
            let newEntry:EntryDocument;

            switch(other.type){
                case "HealthCheck":
                    newEntry = new HealthCheckEntry({
                        ...other,
                        diagnosisCodes:diagnosisCodes
                    })
                    await newEntry.save();
                    break;
                case "Hospital":
                    newEntry = new HospitalEntry({
                        ...other,
                        diagnosisCodes:diagnosisCodes
                    })
                    await newEntry.save();
                    break;
                case "OccupationalHealthcare":
                    newEntry = new OcculationalHealthcareEntry({
                        ...other,
                        diagnosisCodes:diagnosisCodes
                    })
                    await newEntry.save();
                    break;
                default:
                    throw new Error('invalid type');
            }
            // if(diagnosisCodes){
            //     for(const diagCode of diagnosisCodes){
            //         const diagnosis = await DiagnosisModel.findOne({code:diagCode});
            //         if(diagnosis){
            //             newEntry.diagnosisCodesIds.push(diagnosis.id);
            //         }
            //     }
            // }
            await newEntry.save();
            newPatient.entries.push(newEntry.id);
        }
        await newPatient.save();
    }
}

const seedingDiagnosis = async (diagnosisEntries:diagnosis[]) => {
    await Diagnosis.deleteMany({});
    await Diagnosis.create(diagnosisEntries);
    
}


export default {
    diagnosInDb,
    entryInDb,
    patientInDb,
    seedingPatientAndEntries,
    seedingDiagnosis
}