import PatientModel,{patientBaseDocument} from '../model/patients';
import Entry from '../model/entry';
import {NonSensitivePatient,Patient, Entry as entry} from '../types';


const getEntries = async():Promise<Patient[]|undefined> => {
    try {
        const patients = await PatientModel.find({});
        const patientResult:Patient[] = patients.map(p => ({
            id:p.id,
            name:p.name,
            dateOfBirth:p.dateOfBirth,
            gender:p.gender,
            ssn:p.ssn,
            occupation:p.occupation,
            entries:p.entries
        }))
        return patientResult
    } catch (error) {
        console.log(error)
        return [];
    }
}

const getNonSensitiveEntries = async ():Promise<NonSensitivePatient[]|undefined> => {
    try {
        const patients = await PatientModel.find({}).select({_id:1,name:1,dateOfBirth:1,gender:1,occupation:1});
        const patientResult:NonSensitivePatient[] = patients.map(p => ({
            id:p.id,
            name:p.name,
            dateOfBirth:p.dateOfBirth,
            gender:p.gender,
            occupation:p.occupation
        }))
        return patientResult;
    } catch (error) {
        console.log(error)
        return [];
    }
    
}

const findById = async(id:string):Promise<Patient|null> => {
    try {
        const patientEntry = await PatientModel.getFullPatient(id);
        return patientEntry;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

const addPatient = async(entry:Patient):Promise<Patient|undefined> =>{
    try {
        console.log(entry)
        const newPatient:patientBaseDocument = new PatientModel({
            ...entry
        });
        await newPatient.save();
        return newPatient;
    } catch (error) {
        console.log(error);
        return;
    }
}


const addEntry = async (patientId:String, entry:entry):Promise<Patient|null> => {
    try {
        const updatedPatient = await PatientModel.findById(patientId);
        const newEntry = await Entry.addEntry(entry);
        updatedPatient?.entries.concat(newEntry._id);
        await updatedPatient?.save();
        return updatedPatient;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addEntry
}