import React from 'react';
import {Icon, Card} from 'semantic-ui-react';
import {OccupationalHealthcareEntry} from '../types';
import DiagnosisDescription from './DiagnosisDescription';

const OccupationalHealthcareEntryCard = ({entry}:{entry:OccupationalHealthcareEntry}):JSX.Element => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="stethoscope" />
                </Card.Header>
                <DiagnosisDescription description={entry.description} diagnosisCodes={entry.diagnosisCodes}/>
            </Card.Content>
        </Card>
    );
};


export default OccupationalHealthcareEntryCard;