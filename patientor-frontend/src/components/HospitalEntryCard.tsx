import React from 'react';
import {Icon, Card} from 'semantic-ui-react';
import {HospitalEntry} from '../types';
import {useStateValue} from '../state';
import DiagnosisDescription from './DiagnosisDescription';

const HospitalEntryCard = ({entry}:{entry:HospitalEntry}):JSX.Element => {
    const [{diagnoses},] = useStateValue();
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="hospital" />
                </Card.Header>
                <DiagnosisDescription description={entry.description} diagnosisCodes={entry.diagnosisCodes}/>
            </Card.Content>
        </Card>
    );
};


export default HospitalEntryCard;