import React from "react";
import { ErrorMessage, Field, FieldProps} from "formik";
import { Form} from "semantic-ui-react";


// structure of a single option
export interface Option{
  value: string;
  label: string;
}

// props for select field component
export interface SelectFieldProps{
  name: string;
  label: string;
  options: Option[];
}

export const SelectField = ({
  name,
  label,
  options
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  type:'text'|'password';
}

export const TextField= ({
  field,
  label="",
  placeholder,
  type = 'text',
}: TextProps) => (
  <Form.Field>
    {label && <label>{label}</label>}
    <Field placeholder={placeholder} type={type} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
