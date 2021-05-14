import React, { createContext, useContext, useReducer } from "react";
import {pDState, initialPDState} from './patientAndDiagnosis/state'
import { Action as pdAction} from "./patientAndDiagnosis/action";
import { Action as userAction} from './user/action';
import {userState, initialUserState} from './user/state';
  
export type State = pDState | userState;
export type Action = pdAction | userAction;

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

