import {Entry, HealthCheckRating} from '../../types';

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
                date:parseDate(date),
                specialist:parseSpecialist(specialist),
                diagnosisCodes:parseDiagnosisCodes(diagnosisCodes),
                type:props.type,
                healthCheckRating: parseHealthCheckRating(props.healthCheckRating)
            }
            return healthCheckEntry;
        case "Hospital":
            const HospitalEntry:Entry = {
                description:parseDescription(description),
                date:parseDate(date),
                specialist:parseSpecialist(specialist),
                diagnosisCodes:parseDiagnosisCodes(diagnosisCodes),
                type:props.type,
                discharge:{
                    date:parseDate(props.discharge.date),
                    criteria:parseCriteria(props.discharge.criteria)
                }
            }
            return HospitalEntry;
        case "OccupationalHealthcare":
            const OccupationalHealthcareEntry:Entry = {
                description:parseDescription(description),
                date:parseDate(date),
                specialist:parseSpecialist(specialist),
                diagnosisCodes:parseDiagnosisCodes(diagnosisCodes),
                type:props.type,
                employerName:parseName(props.employerName),
                sickLeave: props.sickLeave && {
                    startDate: parseDate(props.sickLeave.startDate),
                    endDate: parseDate(props.sickLeave.endDate)
                } 
            }
            return OccupationalHealthcareEntry;
        default:
            throw new Error('invalid type');
    }
}

const parseHealthCheckRating = (rating:unknown):HealthCheckRating => {
    if(!rating || !isHealthCheckRating(rating)){
        throw new Error('invalid or missing rating')
    }
    return rating;
}

const isHealthCheckRating = (params:any):params is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(params);
}

const parseCriteria = (criteria:unknown):string => {
    if(!criteria || !isString(criteria)){
        throw new Error('missing or invalid criteria');
    }
    return criteria;
}

const parseName = (name:unknown):string => {
    if(!name || !isString(name)){
        throw new Error('missing or invalid name');
    }
    return name;
}



const parseDescription = (description:unknown):string  => {
    if(!description || !isString(description)){
        throw new Error('invalid or missing description' + description);
    }
    return description;
}

const parseSpecialist = (specialist:unknown):string =>{
    if(!specialist || !isString(specialist)){
        throw new Error('invalid or missing specialist' + specialist);
    }
    return specialist;
}

// const parseType = (type:unknown):EntryWithoutId['type'] => {
//     if(!type || !isString(type) || !isType(type)){
//         throw new Error('invalid or missing type')
//     }
//     return type;
// }

const parseDate = (date:unknown):string => {
    if(!date || !isString(date) || isDate(date)){
        throw new Error('invalid or mising date' + date);
    }
    return date;
}

const parseDiagnosisCodes = (diagnosisCodes:unknown):Array<string> => {
    if(isStringArray(diagnosisCodes)){
        return diagnosisCodes;
    }else{
        throw new Error('invalid diagnosiscode type');
    }
}



const isString = (text:unknown):text is string => {
    return typeof text === 'string' || text instanceof String; 
}

const isDate = (date:string):boolean => {
    return Boolean(Date.parse(date));
}

const isStringArray = (data:unknown):data is Array<string> => {
    if(Array.isArray(data)){
        for(const e of data){
            if(!isString(e)){
                throw new Error('invalid array type');
            }
        }
        return true;
    }else{
        return false;
    }
}


// const isType = (type:string):type is EntryField['type'] => {
//     const types = ['OccupationalHealthcare','HealthCheck','Hospital'];
//     if(!types.includes(type)){
//         throw new Error('invalid type');
//     }
//     return true;

// }
