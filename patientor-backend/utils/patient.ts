import {Gender, Patient} from '../types'

type Field = {name:unknown,dateOfBirth:unknown,ssn:unknown,gender:unknown,occupation:unknown}

export const toNewPatient  = ({name,dateOfBirth,ssn,gender,occupation}:Field):Patient => {
    const newEntry:Patient = {
        name:parseName(name),
        dateOfBirth:parseDob(dateOfBirth),
        ssn:parseSSN(ssn),
        gender:parseGender(gender),
        occupation: parseOccupation(occupation) ,
        entries:[]      
    }
    return newEntry;
}

const parseName = (name:unknown):string => {
    if(!name || !isString(name)){
        throw new Error('incorrect or missing name');
    }
    return name;
}

const parseDob = (dateOfBirth:unknown):string => {
    if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('incorrect or missing date' + dateOfBirth);
    }
    return dateOfBirth;
}

const parseSSN = (ssn:unknown):string => {
    if(!ssn || !isString(ssn)){
        throw new Error('incorrect ssn ' + ssn);
    }
    return ssn;
}

const parseGender = (gender:unknown):Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('incorrect or missing gender:' + gender);
    }
    return gender;
}

const parseOccupation = (occupation:unknown):string => {
    if(!occupation || !isString(occupation)){
        throw new Error('incorrect or missing occupation' + occupation);
    } 
    return occupation;
}
 
const isString = (text:unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}


const isDate = (date:string):boolean => {
    return Boolean(Date.parse(date));
}

const isGender = (params:any): params is Gender => {
    return Object.values(Gender).includes(params);
}  

