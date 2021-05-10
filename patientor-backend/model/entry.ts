import {model,Document,Schema,Model} from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
import {BaseEntry,HealthCheckRating,HealthCheckEntry as healthCheckEntry,HospitalEntry as hospitalEntry,OccupationalHealthcareEntry as occupationalHealthcareEntry, Entry as entry} from '../types/types';
//import {DiagnosisDocument} from './diagnosis'
const baseOptions = {
    discriminatorKey:'kind',
}
export interface EntryBaseDocument extends BaseEntry, Document{
    //diagnosisCodesIds: Types.Array<DiagnosisDocument['id']>
}
// export interface populatedEntryBaseDocument extends EntryBaseDocument{
//     diagnosisCodesIds: Types.Array<Diagnosis>
// }

export interface HealthCheckEntryDocument extends healthCheckEntry, EntryBaseDocument{
}
export interface HospitalEntryDocument extends hospitalEntry, EntryBaseDocument{
}
export interface OccupationalHealthcareDocument extends occupationalHealthcareEntry,EntryBaseDocument{
}

export type EntryDocument = HealthCheckEntryDocument | HospitalEntryDocument | OccupationalHealthcareDocument;
//export type populatedEntryDocuemnt = EntryDocument & populatedEntryBaseDocument

export interface  EntryModel extends Model<EntryDocument>{
    //getFullEntryDocument(id:string):Promise<populatedEntryDocuemnt>,
    addEntry(entry:entry):Promise<EntryDocument>
}


const entrySchema:Schema = new Schema({
    description: {type:String, required:true},
    date:  {type:Date, required:true},
    specialist:  {type:String, required:true},
    type:  {type:String, required:true},
    diagnosisCodes:[{
        type:String
        //ref:'Diagnosis'
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

// entrySchema.statics.getFullEntryDocument = async function(
//     this:Model<EntryDocument>,
//     id:string
// ){
//     return this.findById(id).populate('diagnosisCodesIds').exec();
// }

entrySchema.statics.addEntry = async function(
    entry:entry
){
    let newEntry:EntryDocument
    switch(entry.type){
        case "HealthCheck":
            newEntry = new HealthCheckEntry({
                ...entry,
            }) 
            break;
        case "Hospital":
            newEntry = new HospitalEntry({
                ...entry
            })
            break;
        case "OccupationalHealthcare":
            newEntry = new OcculationalHealthcareEntry({
                ...entry
            })
            break;
        default:
            throw new Error('invalid type');
    }
    await newEntry.save();
    return newEntry;
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
            type:Date,
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
            type:Date,
            required:false
        },
        endDate:{
            type:Date,
            required:false
        },
        required:false
    }
})
const Entry = model<EntryDocument,EntryModel>('Entry',entrySchema);
Entry.discriminator('Hospital',HospitalEntrySchema);
export const HospitalEntry = model<HospitalEntryDocument>('Hospital',HospitalEntrySchema);
Entry.discriminator('HealthCheck', HealthCheckEntrySchema)
export const HealthCheckEntry = model<HealthCheckEntryDocument>('HealthCheck',HealthCheckEntrySchema)
Entry.discriminator('OcculationalHealthcare',OccupationalHealthcareEntrySchema)
export const OcculationalHealthcareEntry = model<OccupationalHealthcareDocument>('OcculationalHealthcare',OccupationalHealthcareEntrySchema)
export default Entry;