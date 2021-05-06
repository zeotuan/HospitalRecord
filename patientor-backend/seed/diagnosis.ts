import mongoose from 'mongoose';
import DiagnosisModel from '../model/diagnosis';
import config from '../utils/config';
import diagnosisEntry from '../data/diagnosis';

mongoose.set('debug', true);
const mongoUrl = config.MONGODB_URI? config.MONGODB_URI : '';

mongoose.connect(mongoUrl, {})
    .then(_result => {
        console.log(`connected to mongoDB with URI ${mongoUrl}`);
        DiagnosisModel.deleteMany({});
    }).then(()=>{
        DiagnosisModel.create(diagnosisEntry);
    }).then(()=>{
        mongoose.disconnect();
    })
    .catch(error => {
        console.log(error);
        mongoose.disconnect();
    })

