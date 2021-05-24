import axios from 'axios';
import {Patient, EntryWithoutId} from '../types';
import {apiBaseUrl} from '../constants';
import {PatientFormValues} from '../components/PatientListPage/AddPatientModal/AddPatientForm';

const baseUrl = `${apiBaseUrl}/patients`;


const getAll = async ():Promise<Array<Patient>> => {
    const {data: allPatientFromApi} = await axios.get<Patient[]>(`${baseUrl}`);
    return allPatientFromApi;
    
};

const getPatient = async(id:Patient['id']):Promise<Patient> => {
    const {data: patientFromApi} = await axios.get<Patient>(`${baseUrl}/${id}`);
    return patientFromApi;
};

const addPatient = async(newPatient:PatientFormValues):Promise<Patient> => {
    const {data: addedPatient} = await axios.post<Patient>(`${baseUrl}`,newPatient);
    return addedPatient;
};

const addEntry = async(newEntry:EntryWithoutId, id:Patient['id']):Promise<Patient> => {
    const {data: updatedPatient} = await axios.patch<Patient>(`${baseUrl}/${id}/entries`,newEntry);
    return updatedPatient;
};


export default {
    getAll,
    getPatient,
    addPatient,
    addEntry
};
