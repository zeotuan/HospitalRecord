import {Types} from 'mongoose';

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Diagnosis{
    code:String,
    name:String,
    latin?:String
}

export interface Patient{ 
    id:Types.ObjectId,
    name:String,
    dateOfBirth:String,
    ssn:String,
    gender: Gender,
    occupation:String
    entries:Array<Entry>
}

export interface BaseEntry{
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnosis['code']>,
}

export enum HealthCheckRating{
    "Heahlty" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" =3
}

export interface HealthCheckEntry extends BaseEntry{
    type:"HealthCheck";
    healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry{
    type:"Hospital";
    discharge:{
        date:string,
        criteria:string
    }
}

interface OccupationalHealthcareEntry extends BaseEntry{
    type:"OccupationalHealthcare",
    employerName: string,
    sickLeave?:{
        startDate:string,
        endDate:string
    }
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry
export type NewPatient = Omit<Patient,'id'>;
export type NonSensitivePatient = Omit<Patient,'ssn' | 'entries'>;


type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;