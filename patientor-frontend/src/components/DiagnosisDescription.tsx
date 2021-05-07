import React from 'react';
import {Card} from 'semantic-ui-react';
import {Entry} from '../types';
import {useStateValue} from '../state';

const DiagnosisDescription = ({description,diagnosisCodes}:{description:Entry['description'],diagnosisCodes:Entry['diagnosisCodes']}):JSX.Element => {
    const [{diagnoses},] = useStateValue();
    return (
        <Card.Description>
            {description}
            <ul>
                {diagnosisCodes && diagnosisCodes.map(d => 
                    <li key={d}>
                        {d} : {diagnoses[d] && diagnoses[d].name}
                    </li>
                )}   
            </ul>    
        </Card.Description>
    );
};


export default DiagnosisDescription;