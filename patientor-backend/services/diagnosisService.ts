import {Diagnosis} from '../types';
import DiagnosisModel from '../model/diagnosis';

const getAllDiagnoses = async ():Promise<Diagnosis[]|null> => {
    try {
        const diagnoses = await DiagnosisModel.find({})
        return diagnoses
    } catch (error) {
        console.log(error)
        return null;
    }
}

export default {
    
    getAllDiagnoses
}