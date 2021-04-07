import React from 'react';
import {Icon, Card} from 'semantic-ui-react';
import {HealthCheckEntry, HealthCheckRating} from '../types';
import {useStateValue} from '../state';

const HealthCheckEntryCard = ({entry}:{entry:HealthCheckEntry}):JSX.Element => {
    const [{diagnoses},] = useStateValue();
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="doctor" />
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
            <Card.Content extra>
                <HealthCheckRatingIcon rating={entry.healthCheckRating}/>
            </Card.Content>
        </Card>
    );
};


const HealthCheckRatingIcon = ({rating}:{rating:HealthCheckRating}):JSX.Element => {
    
    switch(rating){
        case HealthCheckRating.Heahlty:
            return <Icon name='heart' color='red'/>;
        case HealthCheckRating.LowRisk:
            return <Icon name='heart' color='green'/>;
        case HealthCheckRating.HighRisk:
            return <Icon name='heart' color='yellow'/>;
        case HealthCheckRating.CriticalRisk:
            return <Icon name='heart' color='orange'/>;
        default:
            return <Icon name='heart' color='grey'/>;
    }
};


export default HealthCheckEntryCard;