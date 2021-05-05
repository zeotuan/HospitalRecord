import {model,Document,Schema,Model,Types} from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
import {Patient,Gender} from '../types'

export interface patientBaseDocument extends Patient,Document{

}

const patientSchema:Schema = new Schema({
    name:String,
    dateOfBirth:String,
    ssn:String,
    gender: {
        type: Gender,
        enum : [Gender.Male,Gender.Female,Gender.Other],
        default: Gender.Other
    },
    occupation:String,
    entries:[{
        type:Types.ObjectId,
        ref:'Entry'
    }]
})

patientSchema.plugin(uniqueValidator)


patientSchema.set('toJSON',{
    transform: (_document:Document,returnedObject:patientBaseDocument) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const PatientModel:Model<patientBaseDocument> = model('Patient',patientSchema)

export default PatientModel;