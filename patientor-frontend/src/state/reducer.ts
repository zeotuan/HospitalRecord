import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_FULL_PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type:"ADD_ENTRY";
      payload: Patient;
  };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      if(action.payload.length === 0){
        return {...state};
      }
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_FULL_PATIENT_INFO":// very similar to add_patient
      return {
        ...state,
        patients:{
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo,diagnosis) => ({...memo, [diagnosis.code]:diagnosis}),
              {}
            ),
            ...state.diagnoses
          }
        };
      case "ADD_ENTRY":
        return {
          ...state,
          patients:{
            ...state.patients,
            [action.payload.id]:action.payload
          }
        };
      
    default:
      return state;
  }
};


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