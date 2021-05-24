import { Patient, Diagnosis } from "../../types";
import {Action} from './action';

export const setPatientList = (patients:Array<Patient>):Action => {
    return{
      type:"SET_PATIENT_LIST",
      payload:patients
    };
  };
  
  export const addPatient = (newPatient:Patient):Action => {
    return {
      type:"ADD_PATIENT",
      payload:newPatient
    };
  };
  
  export const getFullPatientInfo = (patient:Patient):Action => {
    return {
      type:"GET_FULL_PATIENT_INFO",
      payload:patient
    };
  };
  
  export const setDiagnosisList = (diagnoses:Array<Diagnosis>):Action => {
    return {
      type:"SET_DIAGNOSIS_LIST",
      payload: diagnoses
    };
  };
  
  export const addEntry = (updatedPatient:Patient):Action => {
    return {
      type:"ADD_ENTRY",
      payload:updatedPatient
    };
  };