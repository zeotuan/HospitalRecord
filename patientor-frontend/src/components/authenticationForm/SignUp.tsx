import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Message} from "semantic-ui-react";
import Layout from  "./Layout";

const SignUp = (props:{handleSignIn:()=>void}) => {
    return (
        <Layout header="Sign up to get started">
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
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            type="password"
            className="auth-input-field"
          />

          <Link to="/home">
            <Button color="teal" fluid size="huge" className="auth-button" onClick={()=>props.handleSignIn()}>
              Sign up
            </Button>
          </Link>

          <Message size="big">
            <Link to="/login">Already Registered?</Link>
          </Message>
      </Layout>
    );
};

export default SignUp;