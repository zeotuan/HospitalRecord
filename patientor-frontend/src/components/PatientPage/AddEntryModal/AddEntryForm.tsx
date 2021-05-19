import React from 'react';
import {HealthCheckRating, EntryWithoutId, Entry} from '../../../types';
import {Field, Form, Formik} from 'formik';
import {DiagnosisSelection, SelectField, HealthCheckRatingOption, EntryTypeOption} from './FormField';
import {TextField} from '../../FormField';
import {useStateValue} from '../../../improvedState/State';
import { Grid, Button, Dropdown, Form as SForm} from "semantic-ui-react";

// export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry,'id'>;

interface Props{
    onSubmit:(values:EntryWithoutId) => void;
    onCancel:() => void;
}

type objectJson = {
    [field:string]:string
};
const HealthCheckRatingOptions:HealthCheckRatingOption[] = [
    {value:HealthCheckRating.CriticalRisk, label:'CriticalRisk'},
    {value:HealthCheckRating.Heahlty, label:'Healthy'},
    {value:HealthCheckRating.HighRisk, label:'HighRisk'},
    {value:HealthCheckRating.LowRisk, label:'LowRisk'}
];

const EntryTypeOptions:EntryTypeOption[] = [
    {value:"HealthCheck", label:"HealthCheck"},
    {value:"Hospital", label:"Hospital"},
    {value:"OccupationalHealthcare",label:"OccupationHealthcare"}
];

const AddEntryForm = ({onSubmit, onCancel}:Props) => {
    const {patientAndDiagnosis} = useStateValue();
    const [{diagnoses},] = patientAndDiagnosis;
    const [type,setType] = React.useState<Entry['type']>('HealthCheck');
    let initialValue:EntryWithoutId;
    switch(type){
        case "HealthCheck":
            initialValue = {
                description:"",
                date:"",
                specialist:"",
                diagnosisCodes:[""],
                type:type,
                healthCheckRating:HealthCheckRating.LowRisk,
            };
            break;
        case "Hospital":
            initialValue = {
                description:"",
                date:"",
                specialist:"",
                diagnosisCodes:[""],
                type:type,
                discharge:{
                    criteria:"",
                    date:""
                }
            };
            break;
        case "OccupationalHealthcare":
            initialValue = {
                description:"",
                date:"",
                specialist:"",
                diagnosisCodes:[""],
                type:type,
                employerName:"",
                sickLeave:{
                    startDate:"",
                    endDate:""
                }
            };
            break;
        default:
            initialValue = {
                description:"",
                date:"",
                specialist:"",
                diagnosisCodes:[""],
                type:type,
                healthCheckRating:HealthCheckRating.LowRisk,
            };
            break;
    }  
    return  (
        <React.Fragment>

            <SForm name="Type">
                <label>Entry Type</label>
                <Dropdown
                    fluid
                    search
                    selection
                    value={type}
                    options={EntryTypeOptions.map(entry => ({
                        key:entry.value,
                        text:entry.label,
                        value:entry.value
                    }))}
                    onChange={(_e,data) => setType((data.value)as Entry['type'])}
                />
            </SForm>
            <Formik
                enableReinitialize 
                initialValues={initialValue}
                onSubmit={onSubmit}
                validate={values => {
                    
                    const requiredError="field is required";

                    const errors: {[field:string]:objectJson|string } = {};
                    if(!values.date){
                        errors.dates = requiredError;
                    }
                    if(!values.description){
                        errors.description = requiredError;
                    }
                       
                    if(!values.specialist){
                        errors.specialist = requiredError;
                    }

                    if(values.type==="HealthCheck" && !values.healthCheckRating){
                        errors.healthCheckRating = requiredError;
                    }

                    if(values.type==="Hospital"){
                        errors.discharge = {};
                        if(!values.discharge.criteria){
                            errors.discharge.criteria = requiredError;
                        }
                        if(!values.discharge.date){
                            errors.discharge.date = requiredError;
                        }
                        if(values.discharge.criteria && values.discharge.date){
                            delete errors.discharge;
                        }
                    }

                    if(values.type==="OccupationalHealthcare"){
                        if(!values.employerName){
                            errors.employerName = requiredError;
                        }
                    }
                    return errors;
                }}
            >
            {({isValid,dirty,setFieldValue, setFieldTouched,values}) => {
                return (
                    <Form className='form ui'>
                        <Field 
                            label="Description"
                            placeholder="description"
                            name="description"
                            component={TextField}
                        />
                        <Field 
                            label="Date"
                            placeholder="date"
                            name="date"
                            component={TextField}
                        />
                        <Field 
                            label="Specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        {values.type === "HealthCheck" &&
                        <SelectField
                            label="HealthCheckRating"
                            name="healthCheckRating"
                            options={HealthCheckRatingOptions}
                        />
                        }
                        {values.type === "Hospital" &&
                            <div>
                                <Field 
                                    label="Discharge Criteria"
                                    placeholder="criteria"
                                    name="discharge.criteria"
                                    component={TextField}
                                />
                                <Field 
                                    label="Discharge Date"
                                    placeholder="date"
                                    name="discharge.date"
                                    component={TextField}
                                />
                            </div>
                        }
                        {values.type === "OccupationalHealthcare" &&
                            <div>
                                <Field 
                                    label="Employer name"
                                    placeholder="name"
                                    name="employerName"
                                    component={TextField}
                                />
                                <Field 
                                    label="Sickleave Startdate"
                                    placeholder="date"
                                    name="sickLeave.startDate"
                                    component={TextField}
                                />
                                <Field 
                                    label="Sickleave EndDate"
                                    placeholder="date"
                                    name="sickLeave.endDate"
                                    component={TextField}
                                />
                            </div>
                        }
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                type="submit"
                                floated="right"
                                color="green"
                                disabled={!dirty || !isValid}
                                >
                                Add
                                </Button>
                            </Grid.Column>
                        </Grid>    
                    </Form>
                );
            }}
            </Formik>
        </React.Fragment>
    );
};

export default AddEntryForm;