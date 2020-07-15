import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const Container = styled.div`
    width: 90%;
    margin: 3rem auto;

    h2 {
        font-family: 'Poppins';
        font-size: 40;
    }
`;

const Settings = () => {
    const { user } = useContext(UserContext);
    
//     Test Comment
    
    return (
        <>
            {
                user ?
                    <Container>
                        <h2>Settings</h2>
                    </Container>
                : <Redirect to='/' />
            }
        </>
    )
};

export default Settings;
