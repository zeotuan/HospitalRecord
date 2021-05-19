import React from 'react';
import {Container, Table} from 'semantic-ui-react';
import { useStateValue} from '../../improvedState/State';
import { Diagnosis } from '../../types';
import {Link} from 'react-router-dom';


const DiagnosisListPage = () => {
    const {patientAndDiagnosis} = useStateValue();
    const [{diagnoses},] = patientAndDiagnosis;

    return(
        <React.Fragment>
            <Container textAlign="center">
        <h3>Diagnoses list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Latin Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(diagnoses).map((diagnosis: Diagnosis) => (
            <Table.Row key={diagnosis.code}>
              <Table.Cell><Link to={`/diagnosis/${diagnosis.code}`}>{diagnosis.code}</Link></Table.Cell>
              <Table.Cell>{diagnosis.name}</Table.Cell>
              <Table.Cell>{diagnosis.latin? diagnosis.latin : ''}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
        </React.Fragment>
    );
};

export default DiagnosisListPage;