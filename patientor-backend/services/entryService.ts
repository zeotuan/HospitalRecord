import {Entry as entry} from '../types';
import Entry from '../model/entry';


const getAll = async ():Promise<entry[]|null> => {
    try{
        const  allEntries = await Entry.find({});
        return allEntries;
    }catch(error){
        console.log(error);
        return null;
    }
}

const getEntryById = async (id:string):Promise<entry|null> => {
    try {
        const entry = await Entry.findById(id);
        return entry;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export default {
    getAll,
    getEntryById
}