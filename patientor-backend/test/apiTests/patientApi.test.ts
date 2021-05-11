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
            const patient1 = patientAtStart[0];
            const numberofEntryAtStart = patient1.entries.length;
            await api
                .patch(`/api/patients/${patient1.id}/entries`)
                .send(sampleHealthCheckEntry)
                .expect(200)
                .expect('Content-Type',/application\/json/)

            expect(patient1.entries).toHaveLength(numberofEntryAtStart+1);
            
        })
    
    })

    afterAll(()=>{
        mongoose.connection.close();
    })
})
