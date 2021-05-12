import mongoose from 'mongoose';
import config from '../utils/config';
import patientsEntry from '../data/patients';
//import DiagnosisModel from '../model/diagnosis';
import test_helper from '../test/test_helper';



mongoose.set('debug', true);
const mongoUrl = config.MONGODB_URI? config.MONGODB_URI : '';

mongoose.connect(mongoUrl, {})
    .then(_result => {
        console.log(`connected to mongoDB with URI ${mongoUrl}`);
        return test_helper.seedingPatientAndEntries(patientsEntry);
    }).then(()=>{
        console.log('finished seeding patients and entries');
        return  mongoose.disconnect();
    })
    .catch(error => {
        console.log(error);
        return mongoose.disconnect();
    });

