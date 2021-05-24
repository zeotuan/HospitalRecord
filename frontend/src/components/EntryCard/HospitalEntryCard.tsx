import React from 'react';
import {Icon, Card} from 'semantic-ui-react';
import {HospitalEntry} from '../../types';
import DiagnosisDescription from './DiagnosisDescription';

const HospitalEntryCard = ({entry}:{entry:HospitalEntry}):JSX.Element => {
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