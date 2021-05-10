import supertest from 'supertest';
import app from '../../app';
import diagnosisEntry from '../../data/diagnosis';
import userEntry from '../../data/user';
import test_helper from  '../test_helper';
import mongoose from  'mongoose';
import Diagnosis from '../../model/diagnosis';
import { Diagnosis as diagnosis} from '../../types/diagnosis';
const api = supertest(app);
let token:string;

const newDiagnosis:diagnosis = {
    code:'uniqueCode',
    name:'a new Diagnosis'
}

describe('Testing creating diagnosis', () => {
    beforeAll(async () => {
        await Diagnosis.deleteMany({});
        await test_helper.seedingDiagnosis(diagnosisEntry);
        await test_helper.seedingUser(userEntry);
        token = await test_helper.getUserLogInToken();
    })

    test('non user cannot insert diagnosis', async () => {
        
        await api
            .post('/api/diagnosis')
            .send(newDiagnosis)
            .expect(400)

        const diagnosisAtEnd = await test_helper.diagnosInDb();
        expect(diagnosisAtEnd).toHaveLength(diagnosisEntry.length);

    })

    test('user can create diagnosis', async () => {
        await api
            .post('/api/diagnosis')
            .set('Authorization','bearer ' + token)
            .send(newDiagnosis)
            .expect(200)
            .expect('Content-Type',/application\/json/)

        const diagnosisAtEnd = await test_helper.diagnosInDb();
        expect(diagnosisAtEnd).toHaveLength(diagnosisEntry.length+1);

        const diagnosisCode = diagnosisAtEnd.map(b=>b.code);
        expect(diagnosisCode).toContain(newDiagnosis.code);
    })

    
})

afterAll(()=> {
    mongoose.connection.close()
})