import React, { createContext, useContext, useReducer } from "react";
import {pDState, initialPDState} from './patientAndDiagnosis/state'
import { Action as pdAction} from "./patientAndDiagnosis/action";
import { Action as userAction} from './user/action';
import {userState, initialUserState} from './user/state';

export interface ContextState {
  patientAndDiagnosis:[pDState,React.Dispatch<pdAction>]
  user:[userState,React.Dispatch<userAction>]
}

// this might be working need more testing
// export type StateObject = pdStateObject | userStateObject;
// export interface ContextState {
//   [key:string]:StateObject
// }
  
export const Context = createContext<ContextState>(
  {
    patientAndDiagnosis: [initialPDState, ()=>initialPDState],
    user: [initialUserState, ()=>initialUserState]
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
          patientAndDiagnosis:[pDState,pDdispatch],
          user:[uState,uDispatch]
        }
      }>
      {children}
    </Context.Provider>
  );
};
  
export const useStateValue = () => useContext(Context);

