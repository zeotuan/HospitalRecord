import axios from 'axios';
import {Diagnosis} from '../types';
import {apiBaseUrl} from '../constants';

const baseUrl = `${apiBaseUrl}/diagnoses`;

const getAll = async ():Promise<Array<Diagnosis>> => {
    const {data: diagnoses} = await axios.get<Array<Diagnosis>>(`${baseUrl}`);
    return diagnoses;
};

export default {
    getAll
};