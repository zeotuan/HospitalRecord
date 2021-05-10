import {Gender} from './generalTypes';
import {Entry} from './entry';

export interface Patient{ 
    name:String,
    dateOfBirth:String,
    ssn:String,
    gender: Gender,
    occupation:String
    entries:Array<Entry>
}
export type NonSensitivePatient = Omit<Patient,'ssn' | 'entries'>;
