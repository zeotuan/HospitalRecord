import axios from 'axios';
import {Diagnosis} from '../types';
import {apiBaseUrl} from '../constants';
const baseUrl = `${apiBaseUrl}/diagnoses`;

let token = "";

const setToken = (newToken:string) =>{
    token = newToken;
};

const getAll = async ():Promise<Array<Diagnosis>> => {
    const {data: diagnoses} = await axios.get<Array<Diagnosis>>(`${baseUrl}`);
    return diagnoses;
};

const deleteDiagnosis = async (id:string) => {
    await axios.delete(`${baseUrl}/${id}`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {
    getAll,
    setToken,
    deleteDiagnosis
};