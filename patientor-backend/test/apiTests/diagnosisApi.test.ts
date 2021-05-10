import supertest from 'supertest';
import app from '../../app';
import diagnosisEntry from '../../data/diagnosis';
import test_helper from  '../test_helper';
import mongoose from  'mongoose';

import Diagnosis from '../../model/diagnosis';
const api = supertest(app);

describe('Testing creating diagnosis', () => {
    beforeAll(async () => {
        await Diagnosis.deleteMany({});
        await test_helper.seedingDiagnosis(diagnosisEntry)
    })
})