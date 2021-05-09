import Diagnosis from '../../model/diagnosis';
import Entry from '../../model/entry';
import Patient from '../../model/patients';


const diagnosInDb = async () => {
    const diagnosis = await Diagnosis.find({});
    return diagnosis.map(d => d.toJSON())
}

const entryInDb = async () => {
    const entries = await Entry.find({});
    return entries.map(e => e.toJSON());
}

const patientInDb = async () => {
    const patients = await Patient.find({});
    return patients.map(p => p.toJSON());
}