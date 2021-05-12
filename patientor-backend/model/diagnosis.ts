import mongoose, {Document,Schema,model} from 'mongoose';
import {Diagnosis as diagnosis} from '../types/diagnosis';
import uniqueValidator from 'mongoose-unique-validator';
export interface DiagnosisDocument extends diagnosis,Document{
}

const diagonsisSchema:Schema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    latin:{
        type:String,
        required:false
    }
});

diagonsisSchema.plugin(uniqueValidator);

diagonsisSchema.set('toJSON',{
    transform: (_document:Document,returnedObject:DiagnosisDocument) => {    
        /* eslint-disable */
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        /* eslint-enable */
    }
});

const Diagnosis = model<DiagnosisDocument>('Diagnosis',diagonsisSchema);

export default Diagnosis;