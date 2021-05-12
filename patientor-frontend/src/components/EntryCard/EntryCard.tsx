import React from 'react';
import HealthCheckEntryCard from './HealthCheckEntryCard';
import HospitalEntryCard from './HospitalEntryCard';
import OccupationalHealthcareEntryCard from './OccupationalHealthcareEntryCard';
import {Entry} from '../../types';

const EntryCard = ({entry}:{entry:Entry}):JSX.Element => {
    switch(entry.type){
        case "HealthCheck":
            return <HealthCheckEntryCard entry={entry} />;
        case "Hospital":
            return <HospitalEntryCard entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryCard entry={entry}/>;
        default:
            console.log("this entry has invalid type");
            console.log(entry);
            return (
                <React.Fragment></React.Fragment>
            );
    }
};

export default EntryCard;