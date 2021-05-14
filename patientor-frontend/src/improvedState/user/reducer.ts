import { userState } from "./state";
import { User} from "../../types";
import {Action} from './action';


export const reducer = (state: userState, action: Action): userState => {
  switch (action.type) {
    case "LOG IN":
      if(action.payload){
        return {user:action.payload};
      }
      return {user:null};
    case "LOG OUT":
      return {user:null};

    default:
      return state;
  }
};
