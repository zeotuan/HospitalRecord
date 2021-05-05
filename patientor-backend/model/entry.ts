import {model,Document,Schema,Model, Types} from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
import {BaseEntry,HealthCheckRating,HealthCheckEntry} from '../types';

const baseOptions = {
    discriminatorKey:'kind',
}
export interface EntryBaseDocument extends BaseEntry, Document{

}

export interface HealthCheckEntryDocument extends HealthCheckEntry, Document{

}

const entrySchema:Schema = new Schema({
    description: {type:String, required:true},
    date:  {type:Date, required:true},
    specialist:  {type:String, required:true},
    type:  {type:String, required:true},
    diagnosisCodes:[{
        type:Types.ObjectId,
        ref:'Diagnosis'
    }]
},baseOptions)

entrySchema.plugin(uniqueValidator)


entrySchema.set('toJSON',{
    transform: (_document:Document,returnedObject:EntryBaseDocument) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});



const HealthCheckEntrySchema:Schema = new Schema({
        healthCheckRating:{
            type: HealthCheckRating,
            enum : Object.values(HealthCheckRating),
            default: HealthCheckRating.LowRisk
        }
})

const HospitalEntrySchema:Schema = new Schema({
    discharge:{
        date:{
            type:String,
            required:true
        },
        criteria:{
            type:String,
            required:true
        }
    }
})

const OccupationalHealthcareEntrySchema:Schema = new Schema({
    employerName: String,
    sickLeave:{
        startDate:{
            type:String,
            required:true
        },
        endDate:{
            type:String,
            required:true
        },
        required:false
    }
})
const EntryModel:Model<EntryBaseDocument> = model('Entry',entrySchema)
export const HospitalEntryModel = EntryModel.discriminator('HospitalEntry',HospitalEntrySchema)
export const HealthCheckEntryModel = EntryModel.discriminator('HealthCheckEntry', HealthCheckEntrySchema)
export const OcculationalHealthcareEntryModel = EntryModel.discriminator('OcculationalHealthcareEntry',OccupationalHealthcareEntrySchema)


export default EntryModel;