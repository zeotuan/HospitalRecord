import diagnoses from '../data/diagnosis';
import {Diagnosis} from '../types';
import DiagnosisModel from '../model/diagnosis';

const getEntries = async ():Promise<Diagnosis[]> => {
    return diagnoses;
}

const getAlldiagnoses = async ():Promise<Diagnosis[]|null> => {
    try {
        const diagnoses = await DiagnosisModel.find({})
        return diagnoses
    } catch (error) {
        console.log(error)
        return null;
    }
}


export default {
    getEntries,
    getAlldiagnoses
}