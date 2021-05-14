import { NonSensitivePatient,Patient, Diagnosis } from "../../types";

export type pDState = {
    patients: { [id: string]: Patient|NonSensitivePatient /*| undefined*/ };
    diagnoses: { [id in Diagnosis['code']]:Diagnosis};
};
  
export const initialPDState: pDState = {
    patients: {},
    diagnoses: {}
  };