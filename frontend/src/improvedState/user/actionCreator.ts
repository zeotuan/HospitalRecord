import {User} from "../../types";
import {Action} from './action';

export const SETUSER = (user:User):Action => {
    return{
      type:"SET USER",
      payload:user
    };
  };

export const LOGOUT = ():Action => {
  return {
    type:"LOG OUT",
    payload:null
  };
};
  
 