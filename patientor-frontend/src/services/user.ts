import axios from 'axios';
import {User} from '../types';
import {apiBaseUrl} from '../constants';

const baseUrl = `${apiBaseUrl}/users`;
let token = "";

const setToken = (newToken:string) => {
    token = newToken;
};

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
    const {data:addedUser} = await axios.post<User>(`${baseUrl}/signUp`,newUser);
    return addedUser;
};

const signIn = async (user:userLogInInput):Promise<LogInResult> => {
    const {data:logInResult} = await axios.post<LogInResult>(`${baseUrl}/login`,user);
    return logInResult;    
};

const getUser = async ():Promise<User> => {
    const {data:user} = await axios.get<User>(`${baseUrl}/`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
    return user;
};

export default {
    signUp,
    signIn,
    getUser,
    setToken
};