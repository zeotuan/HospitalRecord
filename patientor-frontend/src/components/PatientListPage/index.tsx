import React from "react";
import {Link} from "react-router-dom";
import { Container, Table, Button } from "semantic-ui-react";
import { PatientFormValues } from "./AddPatientModal/AddPatientForm";
import AddPatientModal from "./AddPatientModal";
import { Patient, NonSensitivePatient } from "../../types";
import HealthRatingBar from "../HealthRatingBar";
//import { useStateValue, addPatient } from "../state";
import { useStateValue as testUseStateValue} from '../../improvedState/State';
import {addPatient} from '../../improvedState/patientAndDiagnosis/actionCreator';
import patientServices from '../../services/patient';

const PatientListPage = () => {
  //const [{ patients }, dispatch] = useStateValue();
  const {patientAndDiagnosis} = testUseStateValue();//testing new state reducer
  const [{patients},dispatch] = patientAndDiagnosis;// get patient from testing state reducer
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const newPatient = await patientServices.addPatient(values);
      dispatch(addPatient(newPatient));// test dispatch
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient|NonSensitivePatient) => (
            <Table.Row key={patient.id}>
              <Table.Cell><Link to={`/patient/${patient.id}`}>{patient.name}</Link></Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
            
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;
