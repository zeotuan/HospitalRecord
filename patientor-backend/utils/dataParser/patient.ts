import { Patient} from '../../types/patient'
import generalParser from './generalParser_helper';
type Field = {name:unknown,dateOfBirth:unknown,ssn:unknown,gender:unknown,occupation:unknown}

export const toNewPatient  = ({name,dateOfBirth,ssn,gender,occupation}:Field):Patient => {
    const newEntry:Patient = {
        name:generalParser.parseName(name),
        dateOfBirth:generalParser.parseDate(dateOfBirth),
        ssn:parseSSN(ssn),
        gender:generalParser.parseGender(gender),
        occupation: parseOccupation(occupation) ,
        entries:[]      
    }
    return newEntry;
}

const parseSSN = (ssn:unknown):string => {
    if(!ssn || !generalParser.isString(ssn)){
        throw new TypeError('incorrect ssn ' + ssn);
    }
    return ssn;
}

const parseOccupation = (occupation:unknown):string => {
    if(!occupation || !generalParser.isString(occupation)){
        throw new TypeError('incorrect or missing occupation' + occupation);
    } 
    return occupation;
}
