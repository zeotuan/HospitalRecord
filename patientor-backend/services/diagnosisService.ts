import {Diagnosis as diagnosis} from '../types';
import Diagnosis from '../model/diagnosis';

const getAllDiagnoses = async ():Promise<diagnosis[]|null> => {
    try {
        const diagnoses = await Diagnosis.find({})
        return diagnoses
    } catch (error) {
        console.log(error)
        return null;
    }
}

export default {
    
    getAllDiagnoses
}