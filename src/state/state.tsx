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
