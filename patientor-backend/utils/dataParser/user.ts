import { User } from "../../types/user";
import generalParser from './generalParser_helper';
import bcrypt from 'bcrypt';
import config from '../config';

type Field = {username:unknown,name:unknown,password?:unknown}

export const toNewUser= async (props:Field):Promise<User> => {
    const {username,name,password} = props;
    const newUser:User = {
        username:parseUserName(username),
        name:generalParser.parseName(name),
    };
    const parsedPassword = parsePassword(password);
    if(parsedPassword){
        newUser.passwordHash = await hashPassword(parsedPassword,config.saltRound);
    }
    return newUser;
}

export const toUser = (props:Field):User => {
    const {username,password} = props;
    const user:User = {
        username:parseUserName(username),
        password:parsePassword(password)
    }
    return user;
}

const parseUserName  = (username:unknown):string => {
    const parsedUsername = generalParser.parseName(username);
    if(!config.usernameRegex.test(parsedUsername)){
        throw new Error('invalid username');
    }
    return parsedUsername;
}


const parsePassword = (password:unknown):string => {
    if(!password || !generalParser.isString(password)){
        throw new Error('incorrect or missing password');
    }
    if(!config.passwordRegex.test(password)){
        throw new Error('invalid password');
    }
   
    return password;
}

export const hashPassword = async (password:string, saltRound:number):Promise<string> => {
    try {
        const passwordHash = await bcrypt.hash(password,saltRound);
        return passwordHash;
    } catch (error) {
        throw new Error(error);
    }
}



