import {Diagnosis} from './diagnosis';

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

export interface HospitalEntry extends BaseEntry{
    type:"Hospital";
    discharge:{
        date:string,
        criteria:string
    }
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type:"OccupationalHealthcare",
    employerName: string,
    sickLeave?:{
        startDate:string,
        endDate:string
    }
}
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;