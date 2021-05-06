import {model,Document,Schema,Model, Types} from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
import {BaseEntry,HealthCheckRating,HealthCheckEntry,Diagnosis} from '../types';
import {DiagnosisDocument} from './diagnosis'
const baseOptions = {
    discriminatorKey:'kind',
}
export interface EntryBaseDocument extends BaseEntry, Document{
    diagnosisCodes: Types.Array<DiagnosisDocument['id']>
}

export interface populatedEntryDocument extends EntryBaseDocument{
    diagnosisCodes: Types.Array<Diagnosis>
}

export interface  EntryModel extends Model<EntryBaseDocument>{
    getFullEntryDocument(id:string):Promise<populatedEntryDocument>
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

entrySchema.statics.getFullEntryDocument = async function(
    this:Model<EntryBaseDocument>,
    id:string
){
    return this.findById(id).populate('diagnosisCodes').exec();
}


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
const EntryModel = model<EntryBaseDocument,EntryModel>('Entry',entrySchema)
export const HospitalEntryModel = EntryModel.discriminator('HospitalEntry',HospitalEntrySchema)
export const HealthCheckEntryModel = EntryModel.discriminator('HealthCheckEntry', HealthCheckEntrySchema)
export const OcculationalHealthcareEntryModel = EntryModel.discriminator('OcculationalHealthcareEntry',OccupationalHealthcareEntrySchema)
export default EntryModel;