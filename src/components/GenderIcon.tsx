import React from 'react';
import {Gender} from '../types';
import {Icon} from 'semantic-ui-react';
 
const GenderIcon = ({gender}:{gender:Gender}):JSX.Element => {
    switch(gender){
        case Gender.Male:
            return <Icon name='male'/>;
        case Gender.Female:
            return <Icon name='female'/>;
        default:
            return <Icon name='other gender'/>;
    }
};

export default GenderIcon;