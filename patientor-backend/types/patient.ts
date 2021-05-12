import {Gender} from './generalTypes';
import {Entry} from './entry';

export interface Patient{ 
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender: Gender,
    occupation:string
    entries:Array<Entry>
}
export type NonSensitivePatient = Omit<Patient,'ssn' | 'entries'>;
