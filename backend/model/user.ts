import {Schema,model,Document} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import {User as user} from '../types/user';

export interface userDocument extends user,Document{
    id:string,
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
        /* eslint-disable */
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
        /* eslint-enable */
    }
});

const User = model<userDocument>('User',userSchema);
export default User;