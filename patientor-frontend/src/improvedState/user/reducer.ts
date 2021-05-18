import { userState } from "./state";
import {Action} from './action';
import { User } from "../../types";


export const reducer = (state: userState, action: Action): userState => {
  switch (action.type) {
    case "SET USER":
      if(action.payload){
        return {user:action.payload as User};
      }else{
        return {user:null};
      }
    case "LOG OUT":
      return {user:null};

    default:
      return state;
  }
};
