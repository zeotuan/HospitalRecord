import mongoose, {Document,Schema, Model} from 'mongoose';
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
        required:true
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

const DiagnosisModel: Model<DiagnosisDocument> = mongoose.model('Diagnosis',diagonsisSchema);

export default DiagnosisModel;