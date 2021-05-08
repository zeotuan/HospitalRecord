import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, HealthCheckRating, Entry } from "../types";

interface optionBase {
  label: string
}

export interface HealthCheckRatingOption extends optionBase {
  value: HealthCheckRating
}

export interface EntryTypeOption extends optionBase {
  value: Entry['type'];
}

export type Options = HealthCheckRatingOption | EntryTypeOption;

type OptionsSelectFieldProps = {
  name: string;
  label: string;
  options: Options[];
};

export const SelectField = ({
  name,
  label,
  options
}:OptionsSelectFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field as='select' name={name}  className='ui dropdown'>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label || option.value}</option>
        ))}
      </Field>
    </Form.Field>
  );
};


interface NumberProps extends FieldProps {
    label: string;
    errorMessage?: string;
    min: number;
    max: number;
}
  
export const NumberField = ({ field, label, min, max } : NumberProps ) => (
    <Form.Field>
      <label>{label}</label>
      <Field {...field} type='number' min={min} max={max} />
  
      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
);
  
  export const DiagnosisSelection = ({
    diagnoses,
    setFieldValue,
    setFieldTouched
  }: {
    diagnoses: Diagnosis[];
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
    setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
  }) => {
    const field = "diagnosisCodes";
    const onChange = (
      _event: React.SyntheticEvent<HTMLElement, Event>,
      data: DropdownProps
    ) => {
      setFieldTouched(field, true);
      setFieldValue(field, data.value);
    };
  
    const stateOptions = diagnoses.map(diagnosis => ({
      key: diagnosis.code,
      text: `${diagnosis.name} (${diagnosis.code})`,
      value: diagnosis.code
    }));
  
    return (
      <Form.Field name={field}>
        <label>Diagnoses</label>
        <Dropdown
          fluid
          multiple
          search
          selection
          options={stateOptions}
          onChange={onChange}
        />
        <ErrorMessage name={field} />
      </Form.Field>
    );
  };
  