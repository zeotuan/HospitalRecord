import supertest from 'supertest';
import app from '../../app';
import diagnosisEntry from '../../data/diagnosis';
import userEntry from '../../data/user';
import patientEntry from  '../../data/patients'
import test_helper from  '../test_helper';
import mongoose from  'mongoose';
import Diagnosis from '../../model/diagnosis';
import Entry from '../../model/entry';
import Patient from '../../model/patients';
import User from '../../model/user';
import {HealthCheckEntry,OccupationalHealthcareEntry,HospitalEntry} from '../../types/entry';
import patientsEntry from '../../data/patients';
const api = supertest(app);
let token:string;

const sampleHealthCheckEntry:HealthCheckEntry = {
    date: '2019-10-20',
    specialist: 'MD House',
    type: 'HealthCheck',
    description: 'Yearly control visit. Cholesterol levels back to normal.',
    healthCheckRating: 0,
} 

const sampleHospitalEntry:HospitalEntry = {
    date: '2015-01-02',
    type: 'Hospital',
    specialist: 'MD House',
    diagnosisCodes: ['S62.5'],
    description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
    discharge: {
        date: '2015-01-16',
        criteria: 'Thumb has healed.',
    },
}

const sapmleOccuationalEntry:OccupationalHealthcareEntry =  {
    date: '2019-08-05',
    type: 'OccupationalHealthcare',
    specialist: 'MD House',
    employerName: 'HyPD',
    diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
    description:
      'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
    sickLeave: {
      startDate: '2019-08-05',
      endDate: '2019-08-28',
    }
  }

describe('testing patient api', () => {
    beforeAll( async ()=>{
        await User.deleteMany({});
        await Diagnosis.deleteMany({});
        await test_helper.seedingUser(userEntry);
        await test_helper.seedingDiagnosis(diagnosisEntry);
        token = await test_helper.getUserLogInToken();
        
    })
    describe('testing creating entry', () => {
        beforeEach(async () => {
            await Entry.deleteMany({});
            await Patient.deleteMany({});
            await test_helper.seedingPatientAndEntries(patientEntry);
        })
        test('an entry can be created', async () => {
            const patientAtStart = await test_helper.patientInDb();
            const patientToTest = patientAtStart[0];
            const numberofEntryAtStart = patientToTest.entries.length;
            const response = await api
                .patch(`/api/patients/${patientToTest.id}/entries`)
                .send(sampleHealthCheckEntry)
                .expect(200)
                .expect('Content-Type',/application\/json/);
            
            expect(response.body.entries).toHaveLength(numberofEntryAtStart+1);
        })
        test('an hospital entry will be created with correct type', async () => {
            const patientAtStart = await test_helper.patientInDb();
            const patientToTest = await Patient.findByIdAndUpdate(patientAtStart[0].id,{$set:{entries:[]}},{new:true});
            const response = await api
                .patch(`/api/patients/${patientToTest}/entries`)
                .send(sampleHospitalEntry)
                .expect(200)
                .expect('Content-Type',/application\/json/);
            const insertedEntry = await Entry.findById(response.body.entries[0]);
            expect(insertedEntry?.type).toEqual(sampleHospitalEntry.type);

        })
        test('an HealthCheck entry will be created with correct type', async () => {
            const patientAtStart = await test_helper.patientInDb();
            const patientToTest = await Patient.findByIdAndUpdate(patientAtStart[0].id,{$set:{entries:[]}},{new:true});
            const response = await api
                .patch(`/api/patients/${patientToTest}/entries`)
                .send(sampleHealthCheckEntry)
                .expect(200)
                .expect('Content-Type',/application\/json/);
            const insertedEntry = await Entry.findById(response.body.entries[0]);
            expect(insertedEntry?.type).toEqual(sampleHealthCheckEntry.type);

        })
        test('an occupational health check entry will be created with correct type', async () => {
            const patientAtStart = await test_helper.patientInDb();
            const patientToTest = await Patient.findByIdAndUpdate(patientAtStart[0].id,{$set:{entries:[]}},{new:true});
            const response = await api
                .patch(`/api/patients/${patientToTest}/entries`)
                .send(sapmleOccuationalEntry)
                .expect(200)
                .expect('Content-Type',/application\/json/);
            const insertedEntry = await Entry.findById(response.body.entries[0]);
            expect(insertedEntry?.type).toEqual(sapmleOccuationalEntry.type);

        })
        describe('testing retrieving entry', () => {
            beforeAll(async () => {
                await Entry.deleteMany({});
                await Patient.deleteMany({});
                await test_helper.seedingPatientAndEntries(patientEntry);
            })
            test('patient is returned as json', async () => {
                await api.get('/api/patients').expect(200).expect('Content-Type',/application\/json/);
            }) 
            test('all note are returned ', async ()=> {
                const response = await api.get('/api/patients');
                expect(response.body).toHaveLength(patientsEntry.length);
            })
            test('patient unique identifier is named id ', async () => {
                const response = await api.get('/api/patients');
                const patientToTest = response.body[0];
                expect(patientToTest.id).toBeDefined();
            })

        })
    
    })

    afterAll(()=>{
        mongoose.connection.close();
    })
})
