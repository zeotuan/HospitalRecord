import React from 'react';
import {Icon, Card} from 'semantic-ui-react';
import {HospitalEntry} from '../types';
import {useStateValue} from '../state';

const HospitalEntryCard = ({entry}:{entry:HospitalEntry}):JSX.Element => {
    const [{diagnoses},] = useStateValue();
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="hospital" />
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


export default HospitalEntryCard;