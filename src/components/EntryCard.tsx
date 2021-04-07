import React from 'react';
import HealthCheckEntryCard from '../components/HealthCheckEntryCard';
import HospitalEntryCard from '../components/HospitalEntryCard';
import OccupationalHealthcareEntryCard from '../components/OccupationalHealthcareEntryCard';
import {Entry} from '../types';

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