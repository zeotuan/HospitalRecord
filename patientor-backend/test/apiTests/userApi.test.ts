import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../app';
import User from '../../model/user';
import test_helper from '../test_helper';
import userEntry from '../../data/user'
const api = supertest(app);

describe('test user api', () => {
    beforeAll(async ()=>{
        await User.deleteMany({});
        await test_helper.seedingUser(userEntry);
    })
    describe('test get user api ', () => {
        test('test getting all user', async () => {
            const response = await api.get('/api/user')
            expect(response.body).toHaveLength(userEntry.length);
        })
        test('user get user by id', async () => {
            const userAtStart = await test_helper.userInDb();
            const userToTest = userAtStart[0];
            const response = await api.get(`/api/user/${userToTest.id}`);
            console.log(response);
        })
    })
    describe('testing post user api', () => {
        
    })
    afterAll(() => {
        mongoose.connection.close();
    })
})