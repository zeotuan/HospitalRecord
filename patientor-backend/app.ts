import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnoses';
import userRouter from './routes/user';
import config from './utils/config';
import mongoose from 'mongoose';
import middleware from './utils/middleware';
import { token } from './types/generalTypes';

declare global {
    namespace Express {
         export interface Request {
              decodedToken:token|undefined
         }
    }
    namespace NodeJS {
        interface ProcessEnv {
          GITHUB_AUTH_TOKEN: string;
          NODE_ENV: 'dev'|'production'|'test';
          PORT?: string;
          JWT_SECRET: string;
          saltRound:number;
          passwordRegex:RegExp;
          usernameRegex:RegExp;
        }
      }
}

const app = express();
mongoose.set('debug', true);
const mongoUrl = config.MONGODB_URI? config.MONGODB_URI : '';
mongoose.connect(mongoUrl, {})
    .then(_result => {
        console.log(`connected to mongoDB with URI ${mongoUrl}`);
    })
    .catch(error => {
        console.log(error);
    });

app.use(cors());
app.use(express.json());
app.use(middleware.errorHandler);
app.use(middleware.morganMiddleware);
app.use(middleware.tokenExtractor);
app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/users',userRouter);
app.get('/api/ping', (_req,res) => {
    res.send('pong');
});


app.use(middleware.unknownEndpoint);
export default app;