import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients'
import diagnosisRouter from './routes/diagnoses'
import config from './utils/config';
import mongoose from 'mongoose';

const app = express();
mongoose.set('debug', true);
const mongoUrl = config.MONGODB_URI? config.MONGODB_URI : ''
mongoose.connect(mongoUrl, {})
    .then(_result => {
        console.log(`connected to mongoDB with URI ${mongoUrl}`)
    })
    .catch(error => {
        console.log(error)
    })

app.use(cors())
app.use(express.json());
app.use('/api/patients', patientRouter)
app.use('/api/diagnoses', diagnosisRouter)

app.get('/api/ping', (_req,res) => {
    res.send('pong');
})


export default app;