import {Schema,model,Document} from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
import {User as user} from '../types/user';

export interface userDocument extends user,Document{

}

const userSchema  = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name: {
        type:String
    },
    passwordHash:{
        type:String,
        required:true
    }
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform:(_document:Document, returnedObject:userDocument) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

export const User = model<userDocument>('User',userSchema);