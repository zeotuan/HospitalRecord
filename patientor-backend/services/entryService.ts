import {Entry} from '../types';
import EntryModel from '../model/entry';


const getAll = async ():Promise<Entry[]|null> => {
    try{
        const  allEntries = await EntryModel.find({});
        return allEntries;
    }catch(error){
        console.log(error);
        return null;
    }
}

const getEntryById = async (id:string):Promise<Entry|null> => {
    try {
        const entry = await EntryModel.getFullEntryDocument(id);
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