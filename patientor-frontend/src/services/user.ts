import axios from 'axios';
import {User} from '../types';
import {apiBaseUrl} from '../constants';

const signUp = async (newUser:User):Promise<User> => {
    const {data:addedUser} = await axios.post<User>(`${apiBaseUrl}/signUp`,newUser);
    return addedUser;
}

const signIn = async (user:User):Promise<User> => {
    const {data:signedInUser} = await axios.post<User>(`${apiBaseUrl}/signIn`,user);
    return signedInUser;    
}

export default {
    signUp,
    signIn
}