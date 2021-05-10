import {Diagnosis as diagnosis} from '../types/types';
import Diagnosis from '../model/diagnosis';

const getAllDiagnoses = async ():Promise<diagnosis[]> => {
    try {
        const diagnoses = await Diagnosis.find({});
        return diagnoses;
    } catch (error) {
        throw new Error(error);
    }
}

const addDiagnosis = async (diagnosis:diagnosis):Promise<diagnosis> => {
    try{
        const newDiagnosis = new Diagnosis({
            ...diagnosis
        });
        await newDiagnosis.save();
        return newDiagnosis;
    }catch(error){
        throw new Error(error);
    }
}

export default {
    
    getAllDiagnoses,
    addDiagnosis
}