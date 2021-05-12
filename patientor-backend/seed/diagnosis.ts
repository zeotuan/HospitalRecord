import mongoose from 'mongoose';
import config from '../utils/config';
import diagnosisEntry from '../data/diagnosis';
import test_helper from '../test/test_helper';

mongoose.set('debug', true);
const mongoUrl = config.MONGODB_URI? config.MONGODB_URI : '';

mongoose.connect(mongoUrl, {})
    .then(_result => {
        console.log(`connected to mongoDB with URI ${mongoUrl}`);
        return test_helper.seedingDiagnosis(diagnosisEntry);
    })
    .then(()=>{
        console.log('finished populting diagnosis');
        mongoose.disconnect;
    })
    .catch(error => {
        console.log(error);
        mongoose.disconnect();
    });


