import axios from 'axios';
import {User} from '../types';
import {apiBaseUrl} from '../constants';

export interface userLogInInput{
    username:string;
    password:string;
}

export interface LogInResult{
    username:string,
    token:string,
    name:string,
    id:string
}

export interface userSignUpInput{
    username:string,
    password:string,
    name:string,
    confirmPassword:string;
}


const signUp = async (newUser:userSignUpInput):Promise<User> => {
    const {data:addedUser} = await axios.post<User>(`${apiBaseUrl}/signUp`,newUser);
    return addedUser;
};

const signIn = async (user:userLogInInput):Promise<LogInResult> => {
    const {data:logInResult} = await axios.post<LogInResult>(`${apiBaseUrl}/signIn`,user);
    return logInResult;    
};

const getUserFromToken = async (token:string):Promise<User> => {
    const {data:user} = await axios.get<User>(`${apiBaseUrl}/userFromToken/${token}`);
    return user;
};

export default {
    signUp,
    signIn,
    getUserFromToken
};