import {model,Document,Schema,Model,Types} from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
import {Patient as patient} from '../types/patient';
import {Entry} from '../types/entry';
import {Gender} from '../types/generalTypes';
import {EntryBaseDocument} from './entry';

export interface patientBaseDocument extends patient, Document{
    entries:Types.Array<EntryBaseDocument['id']>
}

export interface populatedPatientDocument extends patientBaseDocument {
    entries:Types.Array<Entry>
}

export interface patientModel extends Model<patientBaseDocument>{
    getFullPatient(id:string): Promise<populatedPatientDocument>
}

const patientSchema:Schema = new Schema({
    name:String,
    dateOfBirth:String,
    ssn:String,
    gender: {
        type: Gender,
        enum : Object.values(Gender),
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

patientSchema.statics.getFullPatient = async function(
    this:Model<patientBaseDocument>,
    id:String
) {
    return this.findById(id).populate('entries').exec();
}

const Patient = model<patientBaseDocument,patientModel>('Patient',patientSchema);

export default  Patient;
