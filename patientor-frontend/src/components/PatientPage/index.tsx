import React from 'react';
import {Patient,NonSensitivePatient, isPatient} from '../../types';
//import { useStateValue,getFullPatientInfo, addEntry } from "../state";
import {useStateValue as testUseStateValue} from '../../improvedState/State';
import {getFullPatientInfo , addEntry} from '../../improvedState/patientAndDiagnosis/actionCreator';
import {useParams} from 'react-router-dom';
import patientService from '../../services/patient';
import GenderIcon from '../GenderIcon';
import EntryCard from '../EntryCard/EntryCard';
import {EntryWithoutId} from '../../types';
import {Button} from 'semantic-ui-react';
import AddEntryModal from './AddEntryModal/index';


const PatientPage = ():JSX.Element => {
    const {id} = useParams<{id:string}>();
    //const [{patients},dispatch] = useStateValue();
    const {patientAndDiagnosis} = testUseStateValue();
    const [{patients} ,dispatch] = patientAndDiagnosis;
    const [modalOpen,setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string|undefined>();

    const openModal = ():void => setModalOpen(true);
    const closeModal = ():void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values:EntryWithoutId) => {
        try{
            //console.log(values);
            const updatedPatient = await patientService.addEntry(values,id);
            dispatch(addEntry(updatedPatient));
            closeModal();
        }catch(e){
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };
  
    const patient:Patient|NonSensitivePatient|undefined = patients[id];
    if(!patient ||  !isPatient(patient)){
        patientService
            .getPatient(id)
            .then(p => dispatch(getFullPatientInfo(p)))
            .catch(error => console.log(error));
        
        return(
            <React.Fragment></React.Fragment>
        );
    }
    else{
        
        return (
            <React.Fragment>
                <AddEntryModal
                    onSubmit={submitNewEntry} 
                    onClose={closeModal}
                    error={error}
                    modalOpen={modalOpen}
                    
                />  
                <Button onClick={() => openModal()}>Add New Entry</Button>
                <h2>{patient.name} <GenderIcon gender={patient.gender}/></h2> 
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h2>Entries</h2>
                {patient.entries.map(e => {
                    return <EntryCard key={e.id} entry={e} />;
                })
                }
            </React.Fragment>
            );
    }
};

export default PatientPage;