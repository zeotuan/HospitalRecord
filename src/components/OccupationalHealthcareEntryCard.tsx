import React from 'react';
import {Icon, Card} from 'semantic-ui-react';
import {OccupationalHealthcareEntry} from '../types';
import {useStateValue} from '../state';

const OccupationalHealthcareEntryCard = ({entry}:{entry:OccupationalHealthcareEntry}):JSX.Element => {
    const [{diagnoses},] = useStateValue();
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="stethoscope" />
                </Card.Header>
                <Card.Description>
                    {entry.description}
                    <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map(d => 
                            <li key={d}>
                                {d} : {diagnoses[d] && diagnoses[d].name}
                            </li>
                        )}   
                    </ul>    
                </Card.Description>
            </Card.Content>
        </Card>
    );
};


export default OccupationalHealthcareEntryCard;