import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Message} from 'semantic-ui-react';
import Layout from './Layout';


const Login = (props:{handleSignIn:()=>void}) => {
    return (
        <Layout header="Dashboard Log in">
            <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                className="auth-input-field"
            />
            <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                className="auth-input-field"
            />

            <Link to="/home">
                <Button color="teal" fluid size="huge" className="auth-button" onClick={()=>props.handleSignIn()}>
                    Login
                </Button>
            </Link>

            <Message size="big">
                <Link to="/signUp">Not Registered?</Link>
            </Message>
      </Layout>
    );
};

export default Login;