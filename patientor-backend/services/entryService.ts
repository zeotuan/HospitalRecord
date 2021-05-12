import {Entry as entry} from '../types/entry';
import Entry from '../model/entry';


const getAll = async ():Promise<entry[]> => {
    try{
        const  allEntries = await Entry.find({});
        return allEntries;
    }catch(error){
        throw new Error(error);
    }
};

const getEntryById = async (id:string):Promise<entry|null> => {
    try {
        const entry = await Entry.findById(id);
        return entry;
    } catch (error) {
        throw new Error(error);
    }
};


export default {
    getAll,
    getEntryById
};