 import {Gender} from '../../types/generalTypes';



const isString = (text:unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const isDate = (date:string):boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (params:any): params is Gender => {
    return Object.values(Gender).includes(params);
};  


const isStringArray = (data:unknown):data is Array<string> => {
    if(Array.isArray(data)){
        for(const e of data){
            if(!isString(e)){
                throw new TypeError('invalid array type');
            }
        }
        return true;
    }else{
        return false;
    }
};
const parseName = (name:unknown):string => {
    if(!name || !isString(name)){
        throw new TypeError('incorrect or missing name');
    }
    return name;
};

const parseGender = (gender:unknown):Gender => {
    if(!gender || !isGender(gender)){
        throw new TypeError('incorrect or missing gender:' + gender);
    }
    return gender;
};

const parseDate = (date:unknown):string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new TypeError('invalid or mising date' + date);
    }
    return date;
};

export default {
    isString,
    isDate,
    isGender,
    isStringArray,
    parseName,
    parseGender,
    parseDate
};