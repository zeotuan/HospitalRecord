import {User as user} from '../types/user';
import {User} from  '../model/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

const addUser = async (userEntry:user):Promise<user> => {
    try {
        
        const newUser = new User({
            ...userEntry
        });
        await newUser.save();
        return newUser
    } catch (error) {
        throw new Error(error);
    }
}

const login = async (userInfo:user) => {
    try {
        const userLogIn = await User.findOne({username:userInfo.username})
         if(userLogIn && userInfo.password && userLogIn.passwordHash){
                const correctPassword = await bcrypt.compare(userInfo.password,userLogIn.passwordHash);
                if(!correctPassword){
                    throw new Error('invalid username or password');
                }
                const userForToken = {
                    username:userLogIn.username,
                    id:userLogIn._id
                };   
                const token = jwt.sign(userForToken,config.JWT_SECRET);
                return {
                    token,
                    username:userLogIn.username,
                    name:userLogIn.name
                }

         }
         throw new Error('invalid username or password');
    } catch (error) {
        throw new Error(error)
    }
} 

export default {
    addUser,
    login
}



