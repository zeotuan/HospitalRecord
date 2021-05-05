import PatientModel,{patientBaseDocument} from '../model/patients';
import {NonSensitivePatient,Patient, NewPatient, EntryWithoutId} from '../types';


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
        const patients:patientBaseDocument[] = await PatientModel.find({});   
        return patients
    } catch (error) {
        console.log(error)
        return [];
    }
    
}

const findById = async(id:string):Promise<Patient|null> => {
    try {
        const patientEntry:patientBaseDocument|null = await PatientModel.findOne({id});
        return patientEntry;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

const addPatient = async(entry:NewPatient):Promise<Patient|undefined> =>{
    try {
        console.log(entry)
        const newPatient:patientBaseDocument = new PatientModel({
            ...entry
        });
        newPatient.save();
        return newPatient;
    } catch (error) {
        console.log(error);
        return;
    }
}


const addEntry = async (patientId:String, entry:EntryWithoutId):Promise<Patient|null> => {
    try {
        let updatedPatient = await PatientModel.findByIdAndUpdate(patientId,{$push:{entries:entry}},{new:true})
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