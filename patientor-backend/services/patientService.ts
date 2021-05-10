import PatientModel from '../model/patients';
import {NonSensitivePatient,Patient} from '../types/patient';
import Entry from '../model/entry';
import {Entry as entry} from '../types/entry';

const getEntries = async():Promise<Patient[]> => {
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
        throw new Error(error)
    }
}

const getNonSensitiveEntries = async ():Promise<NonSensitivePatient[]> => {
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
        throw new Error(error);
    }
    
}

const findById = async(id:string):Promise<Patient|null> => {
    try {
        const patientEntry = await PatientModel.getFullPatient(id);
        return patientEntry;
    } catch (error) {
        throw new Error(error)
    }
    
}

const addPatient = async(entry:Patient):Promise<Patient> =>{
    try {
        console.log(entry)
        const newPatient = new PatientModel({
            ...entry
        });
        await newPatient.save();
        return newPatient;
    } catch (error) {
        throw new Error(error);
    }
}


const addEntry = async (patientId:String, entry:entry):Promise<Patient> => {
    try {
        const updatedPatient = await PatientModel.findById(patientId);
        if(updatedPatient){
            const newEntry = await Entry.addEntry(entry);
            updatedPatient?.entries.concat(newEntry._id);
            await updatedPatient?.save();
            return updatedPatient;
        }
        throw new Error('cannot find patient to update');
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addEntry
}