import Diagnosis from '../model/diagnosis';
import Entry,{EntryDocument, HealthCheckEntry, HospitalEntry, OcculationalHealthcareEntry} from '../model/entry';
import Patient from '../model/patients';
import User from '../model/user';
import {Patient as patient} from '../types/patient';
import { Diagnosis as diagnosis} from '../types/diagnosis';
import {User as user} from '../types/user';
import {hashPassword} from '../utils/dataParser/user';
import config from '../utils/config';
import jwt from  'jsonwebtoken';

const diagnosInDb = async () => {
    const diagnosis = await Diagnosis.find({});
    return diagnosis.map(d => d.toJSON());
};

const entryInDb = async () => {
    const entries = await Entry.find({});
    return entries.map(e => e.toJSON());
};

const patientInDb = async () => {
    const patients = await Patient.find({});
    return patients.map(p => p.toJSON());
};

const userInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

export const seedingPatientAndEntries = async (patientEntries:patient[]) => {
    await Patient.deleteMany({});
    await Entry.deleteMany({});
    for(const patientEntry of patientEntries){
        const {entries, ...patientInfo} = patientEntry;
        const newPatient = new Patient({
            ...patientInfo
        });
        for(const entry of entries){
            const {diagnosisCodes, ...other} = entry;
            let newEntry:EntryDocument;

            switch(other.type){
                case "HealthCheck":
                    newEntry = new HealthCheckEntry({
                        ...other,
                        diagnosisCodes:diagnosisCodes
                    });
                    await newEntry.save();
                    break;
                case "Hospital":
                    newEntry = new HospitalEntry({
                        ...other,
                        diagnosisCodes:diagnosisCodes
                    });
                    await newEntry.save();
                    break;
                case "OccupationalHealthcare":
                    newEntry = new OcculationalHealthcareEntry({
                        ...other,
                        diagnosisCodes:diagnosisCodes
                    });
                    await newEntry.save();
                    break;
                default:
                    throw new Error('invalid type');
            }
            // if(diagnosisCodes){
            //     for(const diagCode of diagnosisCodes){
            //         const diagnosis = await DiagnosisModel.findOne({code:diagCode});
            //         if(diagnosis){
            //             newEntry.diagnosisCodesIds.push(diagnosis.id);
            //         }
            //     }
            // }
            await newEntry.save();
            newPatient.entries.push(newEntry.id);
        }
        await newPatient.save();
    }
};

const seedingDiagnosis = async (diagnosisEntries:diagnosis[]) => {
    await Diagnosis.deleteMany({});
    await Diagnosis.create(diagnosisEntries);
    
};

const seedingUser = async (userEntries:user[]) => {
    await User.deleteMany({});
    for(const u of userEntries){
        const newUser = new User({
            ...u
        });
        if(newUser.password){
            newUser.passwordHash = await hashPassword(newUser.password,config.saltRound);
            delete newUser.password;
        }
        await newUser.save();
    }
    
};

const getUserLogInToken = async () => {
    const users = await User.find({});
    const u = users[0]; 
    const userForToken = {
        username:u.username,
        id:u.id
    };
    const token = jwt.sign(userForToken,config.JWT_SECRET);
    return token;
};

export default {
    diagnosInDb,
    entryInDb,
    patientInDb,
    userInDb,
    seedingPatientAndEntries,
    seedingDiagnosis,
    seedingUser,
    getUserLogInToken
};