import supertest from 'supertest';
import app from '../../app';
import diagnosisEntry from '../../data/diagnosis';
import userEntry from '../../data/user';
import test_helper from  '../test_helper';
import mongoose from  'mongoose';
import Diagnosis from '../../model/diagnosis';
import User from '../../model/user';
import { Diagnosis as diagnosis} from '../../types/diagnosis';
const api = supertest(app);
let token:string;

const newDiagnosis:diagnosis = {
    code:'uniqueCode',
    name:'a new Diagnosis'
}

type inCompleteDiagnosis  = Partial<diagnosis>;

describe('testing diagnosis api', () => {
    beforeAll(async () => {
        await User.deleteMany({});
        await test_helper.seedingUser(userEntry);
        token = await test_helper.getUserLogInToken();
    })
    
    describe('Testing creating diagnosis', () => {
        beforeEach(async () => {
            await Diagnosis.deleteMany({});
            await test_helper.seedingDiagnosis(diagnosisEntry);
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

        test('a diagnosis without code will not be inserted', async () => {
            const invalidDiagnosis:inCompleteDiagnosis = {
                name:'an invalid diagnosis'
            }
            await api
                .post('/api/diagnosis')
                .set('Authorization','bearer '+token)
                .send(invalidDiagnosis)
                .expect(400)
            const blogAtEnd = await test_helper.diagnosInDb();
            expect(blogAtEnd).toHaveLength(diagnosisEntry.length);
        })

        test('a diagnosis without name will not be inserted', async () => {
            const invalidDiagnosis:inCompleteDiagnosis = {
                code:'Code of an invalid diagnosis'
            }
            await api
                .post('/api/diagnosis')
                .set('Authorization','bearer '+token)
                .send(invalidDiagnosis)
                .expect(400)
            const blogAtEnd = await test_helper.diagnosInDb();
            expect(blogAtEnd).toHaveLength(diagnosisEntry.length);
        })

    })

    describe('Testing getting diagnosis information', () => {
        beforeAll(async () => {
            await Diagnosis.deleteMany({});
            await test_helper.seedingDiagnosis(diagnosisEntry);
            token = await test_helper.getUserLogInToken();
        })
        test('diagnosis are returned as json', async () => {
            await api.get('/api/diagnosis').expect(200).expect('Content-Type',/application\/json/);
        })

        test('all diagnosis can be retrieved', async () => {
            const response = await api.get('/api/diagnosis');
            expect(response.body).toHaveLength(diagnosisEntry.length);
        })

        test('unique identifier is named id', async () => {
            const response = await api.get('/api/diagnosis');
            const diagnosis = response.body[0];
            expect(diagnosis.id).toBeDefined();
        })
    })
    afterAll(()=> {
        mongoose.connection.close();
    })
})


