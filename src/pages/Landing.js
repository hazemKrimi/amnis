import React, { useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';

const Container = styled.div`
    width: 90%;
    margin: 3rem auto;

    h2 {
        font-family: 'Poppins';
        font-size: 40;
    }
`;

const Landing = () => {
    const { showSignUp, showLogIn } = useContext(MainContext);

    return (
        <Container>
            <h2>Live</h2>
            { showSignUp && <SignUp /> }
            { showLogIn && <LogIn /> }
            <h2>Categories</h2>
        </Container>
    )
};

export default Landing;