import {Entry, HealthCheckRating} from '../../types/entry';
import generalParser from './generalParser_helper';
interface BaseEntryField {
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown;
}

interface HealthCheckEntryField extends BaseEntryField{
    type:"HealthCheck";
    healthCheckRating: unknown;
}

interface HospitalEntryField extends BaseEntryField{
    type:"Hospital"
    discharge:{
        date:unknown,
        criteria:unknown
    }
}

interface OccupationalHealthcareEntryField extends BaseEntryField{
    type:"OccupationalHealthcare",
    employerName: unknown;
    sickLeave?:{
        startDate:unknown,
        endDate:unknown
    }
}

type EntryField = HealthCheckEntryField | HospitalEntryField | OccupationalHealthcareEntryField;

export const toNewEntry = (props:EntryField):Entry => {
    const {description,date,specialist,diagnosisCodes} = props
    switch(props.type){
        case "HealthCheck":
            const healthCheckEntry:Entry = {
                description:parseDescription(description),
                date:generalParser.parseDate(date),
                specialist:parseSpecialist(specialist),
                diagnosisCodes:parseDiagnosisCodes(diagnosisCodes),
                type:props.type,
                healthCheckRating: parseHealthCheckRating(props.healthCheckRating)
            }
            return healthCheckEntry;
        case "Hospital":
            const HospitalEntry:Entry = {
                description:parseDescription(description),
                date:generalParser.parseDate(date),
                specialist:parseSpecialist(specialist),
                diagnosisCodes:parseDiagnosisCodes(diagnosisCodes),
                type:props.type,
                discharge:{
                    date:generalParser.parseDate(props.discharge.date),
                    criteria:parseCriteria(props.discharge.criteria)
                }
            }
            return HospitalEntry;
        case "OccupationalHealthcare":
            const OccupationalHealthcareEntry:Entry = {
                description:parseDescription(description),
                date:generalParser.parseDate(date),
                specialist:parseSpecialist(specialist),
                diagnosisCodes:parseDiagnosisCodes(diagnosisCodes),
                type:props.type,
                employerName:generalParser.parseName(props.employerName),
                sickLeave: props.sickLeave && {
                    startDate: generalParser.parseDate(props.sickLeave.startDate),
                    endDate: generalParser.parseDate(props.sickLeave.endDate)
                } 
            }
            return OccupationalHealthcareEntry;
        default:
            throw new Error('invalid type');
    }
}

const parseHealthCheckRating = (rating:unknown):HealthCheckRating => {
    if(!rating || !isHealthCheckRating(rating)){
        throw new TypeError('invalid or missing rating')
    }
    return rating;
}

const isHealthCheckRating = (params:any):params is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(params);
}

const parseCriteria = (criteria:unknown):string => {
    if(!criteria || !generalParser.isString(criteria)){
        throw new TypeError('missing or invalid criteria');
    }
    return criteria;
}

const parseDescription = (description:unknown):string  => {
    if(!description || !generalParser.isString(description)){
        throw new TypeError('invalid or missing description' + description);
    }
    return description;
}

const parseSpecialist = (specialist:unknown):string =>{
    if(!specialist || !generalParser.isString(specialist)){
        throw new TypeError('invalid or missing specialist' + specialist);
    }
    return specialist;
}

// const parseType = (type:unknown):EntryWithoutId['type'] => {
//     if(!type || !isString(type) || !isType(type)){
//         throw new Error('invalid or missing type')
//     }
//     return type;
// }

const parseDiagnosisCodes = (diagnosisCodes:unknown):Array<string> => {
    if(generalParser.isStringArray(diagnosisCodes)){
        return diagnosisCodes;
    }else{
        throw new TypeError('invalid diagnosiscode type');
    }
}



// const isType = (type:string):type is EntryField['type'] => {
//     const types = ['OccupationalHealthcare','HealthCheck','Hospital'];
//     if(!types.includes(type)){
//         throw new Error('invalid type');
//     }
//     return true;

// }
