import mongoose, {Document,Schema,model} from 'mongoose';
import {Diagnosis} from '../types';
const uniqueValidator = require('mongoose-unique-validator');

export interface DiagnosisDocument extends Diagnosis,Document{
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
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const DiagnosisModel = model<DiagnosisDocument>('Diagnosis',diagonsisSchema);

export default DiagnosisModel;