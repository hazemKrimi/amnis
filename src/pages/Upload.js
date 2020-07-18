import React, { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../components/Button';

const Container = styled.div`
    width: 90%;
    margin: 3rem auto;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;

    h2 {
        font-family: 'Poppins';
        font-size: 40;
    }

    #section-header {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        button {
            justify-self: flex-end;
            font-size: 40;
            padding: 0;
        }
    }
`;

const Upload = () => {
    const { user } = useContext(UserContext);
    const { darkMode } = useContext(MainContext);
    const history = useHistory();

    return (
        <>
            {
                user ?
                    <Container darkMode={darkMode}>
                        <div id='section-header'>
                            <h2>Upload</h2>
                            <Button text='Cancel' onClick={() => history.goBack()} />
                        </div>
                    </Container>
                    : <Redirect to='/' />
            }
        </>
    )
};

export default Upload;
