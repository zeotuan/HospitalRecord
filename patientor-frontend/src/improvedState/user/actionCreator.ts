import {User} from "../../types";
import {Action} from './action';

export const LOGIN = (user:User):Action => {
    return{
      type:"LOG IN",
      payload:user
    };
  };

export const LOGOUT = ():Action => {
  return {
    type:"LOG OUT",
    payload:null
  };
};
  
 