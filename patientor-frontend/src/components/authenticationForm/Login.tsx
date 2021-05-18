import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Button, Message} from 'semantic-ui-react';
import Layout from './Layout';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {TextField} from  '../FormField';
import userService, {userLogInInput} from '../../services/user';


interface LogInFormProps{
    onSubmit:(values:userLogInInput) => void
  }

const logInSchema = yup.object().shape({
    username: yup.string().min(3,'username too short').max(50,'username too long').required('username is required'),
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

const Login = () => {
    const history = useHistory();
    const [error,setError] = useState<string|undefined>();
    const handleLogIn =  async(values:userLogInInput) => {
        const result = await userService.signIn(values);
        if(!result || !result.token){
            showError('invalid username or password');
        }
        sessionStorage.setItem("userToken",result.token);
        history.push('/home');
    };
    const showError = (message:string) => {
        setTimeout(()=>{
            setError(message);
        },2000);
        setError(undefined);
    };  
    return (
        <React.Fragment>
            {error && <h2 color='red'>{error}</h2>}
            <Layout header="Dashboard Log in">
                <LogInForm onSubmit={handleLogIn}/>
            </Layout>
        </React.Fragment>
    );
};


export default Login;