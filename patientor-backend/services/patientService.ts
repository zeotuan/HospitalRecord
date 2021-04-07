import patients from '../data/patients';
import {NonSensitivePatient,Patient, NewPatient, EntryWithoutId} from '../types';
import {v1 as uuid} from 'uuid'


const getEntries = ():Patient[] => {
    return patients;
}

const getNonSensitiveEntries = ():NonSensitivePatient[] => {
    return  patients.map(({id,name,dateOfBirth,gender,occupation}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }
    })
}

const findById = (id:string):Patient|undefined => {
    const patientEntry = patients.find(p => p.id ===id );
    return patientEntry;
}

const addPatient = (entry:NewPatient):Patient =>{
    const newPatientEntry:Patient = {
        ...entry,
        id: uuid()
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
}


const addEntry = (patientId:Patient['id'], entry:EntryWithoutId):Patient|undefined => {
    patients.forEach(patient => {
        if(patient.id === patientId){
            patient.entries = patient.entries.concat({
                ...entry,
                id:uuid()
            })    
        }
    })
    const Patient = patients.find(p => p.id === patientId);
    return Patient;

}

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addEntry
}