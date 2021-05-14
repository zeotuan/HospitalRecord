import React, { createContext, useContext, useReducer } from "react";
import { NonSensitivePatient,Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export interface ImprovedState{
  patients: Map<string,Patient>
}

export type State = {
  patients: { [id: string]: Patient|NonSensitivePatient /*| undefined*/ };
  diagnoses: { [id in Diagnosis['code']]:Diagnosis};
};



const initialState: State = {
  patients: {},
  diagnoses: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);



type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);



/// test code for new usercontext, usereducer implement for multiple reducers
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

export type testState = pDState | userState;

export interface StateObject {
  State:testState,
  Dispatch:React.Dispatch<Action>
}

export interface ContextState {
 [key:string]:StateObject
}

export const testContext = createContext<ContextState>(
 {
   patientAndDiagnosis: {State:initialPDState, Dispatch:()=>initialPDState},
   user: {State:initialUserState, Dispatch:()=>initialUserState}
 }
)

type testStateProviderProps = {
 patientAndDiagnosisReducer: React.Reducer<pDState,Action>;
 userReducer:React.Reducer<userState,Action>;
 children: React.ReactElement
}

export const testStateProvider: React.FC<testStateProviderProps> = ({
  patientAndDiagnosisReducer,
  userReducer,
  children
}: testStateProviderProps) => {
  const [pDState, pDdispatch] = useReducer(patientAndDiagnosisReducer, initialPDState);
  const [uState,uDispatch] = useReducer(userReducer,initialUserState)
  return (
    <testContext.Provider 
      value={
        {
          patientAndDiagnosis:{State:pDState,Dispatch:pDdispatch},
          user:{State:uState, Dispatch:uDispatch}
        }
      }>
      {children}
    </testContext.Provider>
  );
};
