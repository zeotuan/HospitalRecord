import Logger from './logger';
import morgan, {StreamOptions} from 'morgan';
import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from './config';
import {token} from '../types/generalTypes';

const stream:StreamOptions = {
    write:(message) => Logger.http(message)
};

const skip = () => {
    const env = process.env.NODE_ENV;
    return  (env !== 'dev' && env !== 'test');
};

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {stream,skip}
);

const errorHandler = (error:Error,_request:Request,response:Response,next:NextFunction):Response|void => {
    Logger.error(error.message);
    if(error.name === 'Cast Error'){
        return response.status(400).send({error:'cast error: ' + error.message});
    }
    else if(error.name === 'Validation Error'){
        return response.status(400).json({error:error.message});
    }
    else if(error.name === 'JsonWebTokenError: jwt must be provided'){
        return response.status(400).json({error:'invalid or missing token'});
    }
    else if (error.name === 'TypeError'){
        return response.status(400).json({error:error.message});
    }
    next(error);
};

const unknownEndpoint  = (_request:Request,response:Response) => {
    response.status(404).send({error:'unknown endpoint'});
};

const tokenExtractor = (request:Request, _response:Response, next:NextFunction) => {
    const authorization = request.get('Authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        const token = authorization.substring(7);
        const verifiedToken = jwt.verify(token,config.JWT_SECRET);
        const decodedToken:token = {
            id:(verifiedToken as token).id,
        }
        request.decodedToken = decodedToken;
    }else{
        request.decodedToken = undefined;
    }  

    next();
};

export default {
    morganMiddleware,
    errorHandler,
    unknownEndpoint,
    tokenExtractor
};
