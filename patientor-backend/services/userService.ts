import {User as user} from '../types/user';
import {User} from  '../model/user';

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

export default {
    addUser
}



