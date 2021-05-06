import PatientModel,{patientBaseDocument} from '../model/patients';
import EntryModel from '../model/entry';
import {NonSensitivePatient,Patient, Entry} from '../types';


const getEntries = async():Promise<patientBaseDocument[]|undefined> => {
    try {
        const patients:patientBaseDocument[] = await PatientModel.find({});
        return patients
    } catch (error) {
        console.log(error)
        return [];
    }
}

const getNonSensitiveEntries = async ():Promise<NonSensitivePatient[]|undefined> => {
    try {
        const patients = await PatientModel.find({});   
        return patients
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


const addEntry = async (patientId:String, entry:Entry):Promise<Patient|null> => {
    try {
        const updatedPatient = await PatientModel.findById(patientId);
        const newEntry = new EntryModel({
            ...entry,
        })
        await newEntry.save();
        updatedPatient?.entries.concat(newEntry._id);
        await updatedPatient?.save()
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