import { pDState } from "./newState";
import { Patient, Diagnosis } from "../types";
import {Action} from './action';


export const reducer = (state: pDState, action: Action): pDState => {
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
