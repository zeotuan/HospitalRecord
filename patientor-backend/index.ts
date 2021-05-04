import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients'
import diagnosisRouter from './routes/diagnoses'
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/patients', patientRouter)
app.use('/api/diagnoses', diagnosisRouter)


const PORT =3001;

app.get('/api/ping', (_req,res) => {
    res.send('pong');
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})