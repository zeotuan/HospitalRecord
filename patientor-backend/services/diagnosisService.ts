import diagnoses from '../data/diagnosis';
import {Diagnosis} from '../types';


const getEntries = async ():Promise<Diagnosis[]> => {
    return diagnoses;
}

export default {
    getEntries,
}