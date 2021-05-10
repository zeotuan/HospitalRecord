import { Diagnosis } from "../../types/diagnosis";
import generalParser from './generalParser_helper';

type Field = {code:unknown,name:unknown,latin?:unknown}

export const toNewDiagnosis= (props:Field):Diagnosis => {
    const {code,name,latin} = props;
    const newDiagnosis:Diagnosis = {
        code:parseCode(code),
        name:generalParser.parseName(name),
    };
    const parsedlatin = parseLatin(latin);
    if(parsedlatin){
        newDiagnosis.latin = parsedlatin
    }
    return newDiagnosis;
}

const parseCode = (code:unknown):string => {
    if(!code || !generalParser.isString(code)){
        throw new Error('incorrect or missing code');
    }
    return code;
}

const parseLatin = (latin:unknown):string|undefined => {
    if(!latin){
        return;
    }
    if(!generalParser.isString(latin)){
        throw new Error('incorrect latin type');
    }
    return latin;
}



