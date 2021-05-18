import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Message} from 'semantic-ui-react';
import Layout from './Layout';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {TextField} from  '../FormField';

export interface userLogInInput{
    username:string;
    password:string;
}

interface LogInFormProps{
    onSubmit:(values:userLogInInput|any) => void
  }

const logInSchema = yup.object().shape({
    username: yup.string().min(3,'too short').max(50,'too long').required('required'),
    password: yup.string().required('password is required').matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
});

const LogInForm = ({onSubmit}:LogInFormProps) => {
    return (
        <Formik
          initialValues={{
              username:"",
              password:""
          }}
          onSubmit={onSubmit}
          validationSchema={logInSchema}   
        >
            {({isValid,dirty})=> {
                return (
                    <Form className="form ui">
                        <Field
                            placeholder="Username"
                            name="username"
                            component={TextField}
                            className="auth-input-field"
                        />
                        <Field
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="auth-input-field"
                            component={TextField}
                        />
                    
                    <Button color="teal" fluid size="huge" className="auth-button" type="submit" disabled={!dirty || !isValid}>
                        Log in 
                    </Button>        
                    <Message size="big">
                        <Link to="/signUp">Not Registered?</Link>
                    </Message>
                    </Form>
                );
            }}
        </Formik>
    );
};

const Login = (props:{handleSignIn:()=>void}) => {
    return (
        <Layout header="Dashboard Log in">
            <LogInForm onSubmit={props.handleSignIn}/>
      </Layout>
    );
};

export default Login;