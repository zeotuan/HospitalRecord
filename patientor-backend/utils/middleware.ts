import Logger from './logger';
import morgan, {StreamOptions} from 'morgan';
import {Request,Response,NextFunction} from 'express'
const stream:StreamOptions = {
    write:(message) => Logger.http(message)
};

const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return  env !== 'development';
};

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {stream,skip}
)

const errorHandler = (error:Error,_request:Request,response:Response,next:NextFunction):Response|void => {
    Logger.error(error.message);
    if(error.name === 'Cast Error'){
        return response.status(400).send({error:'cast error'});
    }
    else if(error.name === 'Validation Error'){
        return response.status(400).json({error:error.message});
    }
    else if(error.name === 'JsonWebTokenError: jwt must be provided'){
        return response.status(400).json({error:'invalid or missing token'})
    }
    next(error)
}

const unknownEndpoint  = (_request:Request,response:Response) => {
    response.status(404).send({error:'unknown endpoint'});
}


export default {
    morganMiddleware,
    errorHandler,
    unknownEndpoint
}
