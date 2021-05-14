import React, { createContext, useContext, useReducer } from "react";
import {pDState, initialPDState} from './patientAndDiagnosis/state'
import { Action as pdAction} from "./patientAndDiagnosis/action";
import { Action as userAction} from './user/action';
import {userState, initialUserState} from './user/state';

export type StateObject = pdStateObject | userStateObject;

export interface pdStateObject {
  State:pDState,
  Dispatch:React.Dispatch<pdAction>
}

export interface userStateObject {
  State:userState,
  Dispatch:React.Dispatch<userAction>
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
  patientAndDiagnosisReducer: React.Reducer<pDState,pdAction>;
  userReducer:React.Reducer<userState,userAction>;
  children: React.ReactElement
}
  
export const StateProvider: React.FC<StateProviderProps> = ({
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
  
export const useStateValue = () => useContext(Context);

