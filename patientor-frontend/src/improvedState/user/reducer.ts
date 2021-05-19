import { userState } from "./state";
import {Action} from './action';

export const reducer = (state: userState, action: Action): userState => {
  switch (action.type) {
    case "SET USER":
      if(action.payload){
        return {
            ...action.payload
        };
      }else{
        return null;
      }
    case "LOG OUT":
      return null;

    default:
      return state;
  }
};
