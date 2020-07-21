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

    #file-upload {
        cursor: pointer;
        display: grid;
        justify-content: center;
        align-items: center;
        height: 15rem;
        border: 3px dashed ${({ darkMode }) => darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(7, 7, 10, 1)'};

        h2 {
            font-family: 'Poppins';
            font-size: 30;
            cursor: pointer;
        }
    }

    #inputs {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 2rem;
        justify-content: center;
        align-items: center;

        input {
            background: ${({ darkMode }) => darkMode ? 'rgba(74, 82, 90, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
            border: none;
            color: ${({ darkMode }) => darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(7, 7, 10, 1)'};
            width: 100%;
            padding: 1rem 0.5rem;
            font-size: 1rem;
            font-weight: 400;

            &::placeholder {
                font-size: 1rem;
            }
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
                            <Button text='Cancel' onClick={() => history.push('/')} />
                        </div>
                        <label htmlFor="video">
                            <div id='file-upload'>
                                <h2>Upload video</h2>
                                <input type="file" accept='video/*' name="video" id="video" style={{ display: 'none' }} />
                            </div>
                        </label>
                        <div id='inputs'>
                            <input type="text" name='title' placeholder='Title' />
                            <input type="text" name='description' placeholder='Description' />
                            <Button mode='form' text='Submit' />
                        </div>
                    </Container>
                    : <Redirect to='/' />
            }
        </>
    )
};

export default Upload;
