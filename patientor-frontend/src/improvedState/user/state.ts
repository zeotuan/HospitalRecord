import { User} from "../../types";
export type userState = {
    user:User|null 
  };
  
  
export const initialUserState: userState = {
    user:null
};
  