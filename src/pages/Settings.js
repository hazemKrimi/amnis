import React, { useContext, useState, useRef, useEffect } from 'react';
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

    #main-info {
        display: grid;
        grid-template-rows: auto 1fr auto;
        row-gap: 2rem;

        #form {
            display: grid;
            grid-template-columns: auto 1fr;
            column-gap: 2rem;

            #profile {
                cursor: pointer;
                width: 7rem;
                height: 7rem;
                border-radius: 50%;
                background: ${({ darkMode }) => darkMode ? '#4A525A' : '#FFFFFF'};
                display: grid;
                justify-items: center;
                align-items: center;

                svg {
                    width: 3.5rem;
                    height: 3.5rem;
                }

                p {
                    cursor: pointer;
                }
            }

            #inputs {
                display: grid;
                grid-template-columns: 1fr;
                row-gap: 0.5rem;
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
        }
    }

    #security {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 2rem;

        #form {
            display: grid;
            grid-template-columns: 1fr;
            row-gap: 0.5rem;
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
    }

    #danger-zone {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 2rem;
    }
`;

const Photo = ({ darkMode }) => {
    const [ hovered, setHovered ] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const element = ref.current;

        element.addEventListener('mouseenter', () => setHovered(true));
        element.addEventListener('mouseleave', () => setHovered(false));
        
        return () => {
            element.removeEventListener('mouseenter', () => {});
            element.removeEventListener('mouseleave', () => {});
        }
    }, []);

    return (
        <label htmlFor="avatar">
            <div id="profile" ref={ref}>
                
                    {
                        !hovered ? (
                            <>
                                <svg viewBox="0 0 34 34">
                                    <g transform="translate(1 1.247)">
                                        <path d="M36,27.916V23.61C36,18.855,32.418,15,28,15H12c-4.418,0-8,3.855-8,8.61v4.305" transform="translate(-4 3.838)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <ellipse cx="8" cy="9" rx="8" ry="9" transform="translate(8 -0.247)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </g>
                                </svg>
                            </>
                        ) : (
                                <>
                                    <p>Upload</p>
                                </>
                            )
                    }
                    <input type="file" accept='image/png, image/jpeg' name="avatar" id="avatar" style={{ display: 'none' }} />
            </div>
        </label>
    );
}

const Settings = () => {
    const { user } = useContext(UserContext);
    const { darkMode } = useContext(MainContext);
    const history = useHistory();
    
    return (
        <>
            {
                user ?
                    <Container darkMode={darkMode}>
                        <div id='section-header'>
                            <h2>Settings</h2>
                            <Button text='Cancel' onClick={() => history.push('/')} />
                        </div>
                        <div id="main-info">
                            <h2>Main Info</h2>
                            <div id='form'>
                                <Photo darkMode={darkMode} />
                                <div id="inputs">
                                    <input type="text" name='username' placeholder='Username' />
                                    <input type="email" name='email' placeholder='Email' />
                                </div>
                            </div>
                            <Button mode='form' text='Save' />
                        </div>
                        <div id="security">
                            <h2>Security</h2>
                            <div id="form">
                                <input type="password" name='password' placeholder='Password' />
                                <input type="password" name='newPassword' placeholder='New Password' />
                                <input type="password" name='confirmNewPassword' placeholder='Confirm New Password' />
                            </div>
                            <Button mode='form' text='Save' />
                        </div>
                        <div id="danger-zone">
                            <h2>Danger Zone</h2>
                            <Button mode='danger' text='Delete Account' />
                        </div>
                    </Container>
                : <Redirect to='/' />
            }
        </>
    )
};

export default Settings;
