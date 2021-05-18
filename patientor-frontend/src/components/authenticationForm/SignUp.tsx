import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Button, Message} from "semantic-ui-react";
import {TextField} from '../FormField';
import Layout from  "./Layout";
import {Field, Form,  Formik} from 'formik';
//import {User} from '../../types';
import * as yup from 'yup';
import userService,{userSignUpInput} from '../../services/user'; 

interface SignUpFormProps{
  onSubmit:(values:userSignUpInput) => void
}

const signUpSchema = yup.object().shape({
  username: yup.string().min(3,'too short').max(50,'too long').required('required'),
  name: yup.string().max(50,'too long'),
  password: yup.string().required('password is required').matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  ),
  confirmPassword: yup.string().required('please confirm your password').oneOf([yup.ref('password'),null],"Password don't match")
});


const SignUpForm = ({onSubmit}:SignUpFormProps) => {
  return(
    <Formik
      initialValues={{
        username:"",
        name:"",
        password:"",
        confirmPassword:"",
      }}
      onSubmit={onSubmit}
      validationSchema={signUpSchema}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Username"
              placeholder="username"
              name="username"
              component={TextField}
              className="auth-input-field"
            />
            <Field
              label="Name"
              placeholder="name"
              name="name"
              className="auth-input-field"
              component={TextField}
              
            />
            <Field
              type="password"
              label="Password"
              placeholder="password"
              name="password"
              className="auth-input-field"
              component={TextField}
              
              
            />
            <Field
              type="password"
              label="Confirm password"
              placeholder="re-enter your password here"
              name="confirmPassword"
              className="auth-input-field"
              component={TextField}
            />
            
            <Button color="teal" fluid size="huge" className="auth-button" type="submit" disabled={!dirty || !isValid}>
              Sign up
            </Button>
            
            
            <Message size="big">
                <Link to="/login">Already Registered?</Link>
            </Message>
          </Form>
        );
      }}
    </Formik>
  );
};

// interface SignUpProps{
//   onSubmit:(values:userSignUpInput|any) => void;
//   onCancel:() => void;
// }

const SignUp = () => {
  const history = useHistory();
  const handleSubmit = async (values:userSignUpInput) => {
    const result = await userService.signUp(values);
    if(result){
      history.push('/login');
      console.log('sign up successfully');
      //should make a notification that can show the result
    }else{
      console.log('sign up fail');
    }
  }; 
  return (
    <Layout header="Sign up to get started">
      <SignUpForm onSubmit={handleSubmit} />  
    </Layout>
  );
};

export default SignUp;