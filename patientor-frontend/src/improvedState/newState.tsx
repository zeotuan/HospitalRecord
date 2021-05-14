import React, { createContext, useContext, useReducer } from "react";
import { NonSensitivePatient,Patient, Diagnosis } from "../types";

import { Action } from "../state/reducer";



export type pDState = {
    patients: { [id: string]: Patient|NonSensitivePatient /*| undefined*/ };
    diagnoses: { [id in Diagnosis['code']]:Diagnosis};
  };
  
  export type userState = {
    user: {
      username?:string,
      name?:string,
      token?:string
    }
  };
  
  const initialPDState: pDState = {
    patients: {},
    diagnoses: {}
  };
  
  const initialUserState: userState = {
    user:{}
  }
  
  export type State = pDState | userState;
  
  export interface StateObject {
    State:State,
    Dispatch:React.Dispatch<Action>
  }
  
  export interface ContextState {
   [key:string]:StateObject
  }
  
  export const Context = createContext<ContextState>(
   {
     patientAndDiagnosis: {State:initialPDState, Dispatch:()=>initialPDState},
     user: {State:initialUserState, Dispatch:()=>initialUserState}
   }
  )
  
  type StateProviderProps = {
   patientAndDiagnosisReducer: React.Reducer<pDState,Action>;
   userReducer:React.Reducer<userState,Action>;
   children: React.ReactElement
  }
  
  export const testStateProvider: React.FC<StateProviderProps> = ({
    patientAndDiagnosisReducer,
    userReducer,
    children
  }: StateProviderProps) => {
    const [pDState, pDdispatch] = useReducer(patientAndDiagnosisReducer, initialPDState);
    const [uState,uDispatch] = useReducer(userReducer,initialUserState)
    return (
      <Context.Provider 
        value={
          {
            patientAndDiagnosis:{State:pDState,Dispatch:pDdispatch},
            user:{State:uState, Dispatch:uDispatch}
          }
        }>
        {children}
      </Context.Provider>
    );
  };
  