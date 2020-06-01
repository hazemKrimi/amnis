import React, { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';

const Landing = () => {
    const { showSignUp, showLogIn } = useContext(MainContext);

    return (
        <>
            { showSignUp && <SignUp /> }
            { showLogIn && <LogIn /> }
        </>
    )
};

export default Landing;