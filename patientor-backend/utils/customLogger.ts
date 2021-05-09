import {EventEmitter} from 'events'

export class LogManager extends EventEmitter {
    private options: LogOptions = {
        minLevels:{
            '':'info'
        }
    }

    // prevent logger from being register twice
    private loggerRegistered: boolean = false;

    public getOptions():LogOptions{
        return this.options;
    }

    public configure(options: LogOptions):LogManager{
        this.options = Object.assign({},this.options,options);
        return this
    }

    public getLogger(module:string):Logger {
        let minLevel = 'none';
        let match = '';

        for(const key in this.options.minLevels){
            if(module.startsWith(key) && key.length >= match.length){
                minLevel = this.options.minLevels['key'];
                match = key;
            }
        }
        return new Logger(this,module,minLevel)
    }

    public registerConsoleLogger(): LogManager {
        if (this.loggerRegistered) return this;

        this.onLogEntry((logEntry) => {
            const msg = `${logEntry.location} [${logEntry.module}] ${logEntry.message}`;
            switch (logEntry.level) {
                case 'trace':
                    console.trace(msg);
                    break;
                case 'debug':
                    console.debug(msg);
                    break;
                case 'info':
                    console.info(msg);
                    break;
                case 'warn':
                    console.warn(msg);
                    break;
                case 'error':
                    console.error(msg);
                    break;
                default:
                    console.log(`{${logEntry.level}} ${msg}`);
            }
        });

        this.loggerRegistered = true;
        return this;
    }

    public onLogEntry(listener: (logEntry: LogEntry) => void):LogManager{
        this.on('log',listener);
        return this;
    }


};


export class Logger {
    private logManager: EventEmitter;
    private minLevel: number;
    private module: string;
    private readonly levels: {[key:string]:number} = {
        'trace':1,
        'debug': 2,
        'info': 3,
        'warn': 4,
        'error': 5
    }

    constructor(logManager:EventEmitter, minLevel:string , module:string){
        this.logManager = logManager;
        this.minLevel = this.levelToInt(minLevel);
        this.module = module;
    }

    private levelToInt(minLevel:string):number {
        if(minLevel.toLowerCase() in this.levels){
            return this.levels[minLevel.toLowerCase()]
        }
        else{
            return 99;
        }
    }

    public log(logLevel:string, message:string):void {
        const level = this.levelToInt(logLevel);
        if(level < this.minLevel) return;

        const logEntry: LogEntry = {level: logLevel, module: this.module, message}
        const error = new Error('');
        if(error.stack){
            const cla = error.stack.split('`n')
            let idx = 1;
            while (idx < cla.length && cla[idx].includes("at Logger.Object.")) idx++;
            if (idx < cla.length) {
                logEntry.location = cla[idx].slice(cla[idx].indexOf("at ") + 3, cla[idx].length);
            }
        }

        this.logManager.emit('log', logEntry);

    }

    public trace(message: string): void { this.log('trace', message); }
    public debug(message: string): void { this.log('debug', message); }
    public info(message: string): void  { this.log('info', message); }
    public warn(message: string): void  { this.log('warn', message); }
    public error(message: string): void { this.log('error', message); }

}

export interface LogEntry{
    level: string;
    module:string;
    location?: string;
    message: string;
}


export interface LogOptions {
    minLevels: { [module: string]: string }
}

export const logging = new LogManager;



//setting up guide:
/*
at entry point of each application for example: 
in ./model/model.ts
import {logging} from '../utils/customLogger'

logging.configure({
    ...logging.getOptions.minLevels
    minLevels:{
        ...logging.getOptions.minLevels,
        'model':'warn'
    }
}).registerConsoleLogger();


in ./model/entry.ts
import {logging} from '../utils/customLogger'

const logger = logging.getLogger('model.entry');

//now to log 
logger.info('this is my log message')
*/