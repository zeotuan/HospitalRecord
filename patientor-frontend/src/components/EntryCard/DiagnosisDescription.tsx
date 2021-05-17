import React from 'react';
import {Card} from 'semantic-ui-react';
import {Entry} from '../../types';
import {useStateValue} from '../../improvedState/State';

const DiagnosisDescription = ({description,diagnosisCodes}:{description:Entry['description'],diagnosisCodes:Entry['diagnosisCodes']}):JSX.Element => {
    const {patientAndDiagnosis} = useStateValue();
    const [{diagnoses},] = patientAndDiagnosis;
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