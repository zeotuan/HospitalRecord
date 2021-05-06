import {model,Document,Schema,Model, Types} from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
import {BaseEntry,HealthCheckRating,HealthCheckEntry,Diagnosis,HospitalEntry,OccupationalHealthcareEntry} from '../types';
import {DiagnosisDocument} from './diagnosis'
const baseOptions = {
    discriminatorKey:'kind',
}
export interface EntryBaseDocument extends BaseEntry, Document{
    diagnosisCodesIds: Types.Array<DiagnosisDocument['id']>
}
export interface populatedEntryBaseDocument extends EntryBaseDocument{
    diagnosisCodesIds: Types.Array<Diagnosis>
}

export interface HealthCheckEntryDocument extends HealthCheckEntry, EntryBaseDocument{
}
export interface HospitalEntryDocument extends HospitalEntry, EntryBaseDocument{
}
export interface OccupationalHealthcareDocument extends OccupationalHealthcareEntry,EntryBaseDocument{
}

export type EntryDocument = HealthCheckEntryDocument | HospitalEntryDocument | OccupationalHealthcareDocument;
export type populatedEntryDocuemnt = EntryDocument & populatedEntryBaseDocument

export interface  EntryModel extends Model<EntryDocument>{
    getFullEntryDocument(id:string):Promise<populatedEntryDocuemnt>
}





const entrySchema:Schema = new Schema({
    description: {type:String, required:true},
    date:  {type:Date, required:true},
    specialist:  {type:String, required:true},
    type:  {type:String, required:true},
    diagnosisCodesIds:[{
        type:Types.ObjectId,
        ref:'Diagnosis'
    }]
},baseOptions)

entrySchema.plugin(uniqueValidator)


entrySchema.set('toJSON',{
    transform: (_document:Document,returnedObject:EntryDocument) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

entrySchema.statics.getFullEntryDocument = async function(
    this:Model<EntryDocument>,
    id:string
){
    return this.findById(id).populate('diagnosisCodesIds').exec();
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
const EntryModel = model<EntryDocument,EntryModel>('Entry',entrySchema)
export const HospitalEntryModel = EntryModel.discriminator('HospitalEntry',HospitalEntrySchema)
export const HealthCheckEntryModel = EntryModel.discriminator('HealthCheckEntry', HealthCheckEntrySchema)
export const OcculationalHealthcareEntryModel = EntryModel.discriminator('OcculationalHealthcareEntry',OccupationalHealthcareEntrySchema)
export default EntryModel;