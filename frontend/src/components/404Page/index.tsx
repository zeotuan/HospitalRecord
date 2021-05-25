import React from 'react';
import { Container } from 'semantic-ui-react';
import pic from '../../images/doge404.jpg';

const NotFoundPage = () => {
    return(
        <Container>
            <img src={pic} alt="Logo"/>
        </Container>
    )
}

export default NotFoundPage;