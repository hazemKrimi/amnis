import React, { useContext, useState, useRef, useEffect } from 'react';
import { MainContext } from '../contexts/MainContext';
import { UserContext } from '../contexts/UserContext';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Authenticate from '../components/Authenticate';
import Alert from '../components/Alert';
import InlineLoader from '../components/InlineLoader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Container = styled.div`
    width: 90%;
    margin: 3rem auto;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;

    h1 {
        font-family: 'Poppins';
        font-size: 40;
    }

    h2 {
        font-family: 'Poppins';
        font-size: 30;
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

                #avatar {
                    width: 7rem;
                    height: 7rem;
                    border-radius: 50%;
                }

                svg {
                    width: 3.5rem;
                    height: 3.5rem;
                }

                p {
                    cursor: pointer;
                }

                .hovered {
                    position: relative;
                    top: 0%;
                    left: 0%;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    display: grid;
                    justify-content: center;
                    align-items: center;
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

                .error {
                    color: #FF4A4A;
                    font-size: 0.8rem;
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

            .error {
                color: #FF4A4A;
                font-size: 0.8rem;
            }
        }
    }

    #danger-zone {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 2rem;
    }
`;

const Photo = ({ darkMode, setAlert }) => {
    const { user, updateAccount } = useContext(UserContext);
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
        <label htmlFor="avatar-upload">
            <div id="profile" ref={ref}>
                {
                    user.photoURL ? (
                        <div id='avatar' style={{ backgroundImage: `url(${user.photoURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            { hovered && <p className='hovered'>Upload</p>}
                        </div>
                    ) : (
                        <>
                            { hovered ? <p className='hovered'>Upload</p> : (
                                <svg viewBox="0 0 34 34">
                                    <g transform="translate(1 1.247)">
                                        <path 
                                            d="M36,27.916V23.61C36,18.855,32.418,15,28,15H12c-4.418,0-8,3.855-8,8.61v4.305" 
                                            transform="translate(-4 3.838)" 
                                            fill="none" 
                                            stroke={darkMode ? '#FFFFFF' : '#07070A'} 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2"
                                        />
                                        <ellipse 
                                            cx="8" 
                                            cy="9" 
                                            rx="8" 
                                            ry="9" 
                                            transform="translate(8 -0.247)" 
                                            fill="none" 
                                            stroke={darkMode ? '#FFFFFF' : '#07070A'} 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2"
                                        />
                                    </g>
                                </svg>
                            ) }
                        </>
                    )
                }
            </div>
            <input 
                type="file" 
                accept='image/png, image/jpeg' 
                name='avatar'
                id='avatar-upload' 
                onChange={async event => {
                    try {
                        if (event.target.files[0]) await updateAccount(null, null, event.target.files[0], null);
                    } catch(err) {
                        setAlert({ type: 'failure', text: 'Error occured! Try again later' });
                        setTimeout(() => setAlert(null), 5000);
                    }
                }}
                style={{ display: 'none' }} />
        </label>
    );
}

const Settings = () => {
    const { user, updateAccount, deleteAccount } = useContext(UserContext);
    const { darkMode } = useContext(MainContext);
    const [ reAuth, setReAuth ] = useState(true);
    const [ mainInfoLoading, setMainInfoLoading ] = useState(false);
    const [ securityLoading, setSecurityLoading ] = useState(false);
    const [ alert, setAlert ] = useState(null);
    const history = useHistory();

    const mainInfoForm = useFormik({
        initialValues: {
            username: '',
            email: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string(),
            email: Yup.string().email('Email is invalid')
        }),
        onSubmit: async({ username, email }) => {
            try {
                setMainInfoLoading(true);
                await updateAccount(username, email, null, null);
                setMainInfoLoading(false);
                setAlert({ type: 'success', text: 'Main info updated successfully' });
                setTimeout(() => setAlert(null), 5000);
            } catch(err) {
                setMainInfoLoading(false);
                setAlert({ type: 'failure', text: 'Error occured! Try again later' });
                setTimeout(() => setAlert(null), 5000);
            } finally {
                mainInfoForm.resetForm();
            }
        }
    });

    const securityForm = useFormik({
        initialValues: {
            newPassword: '',
            confirmNewPassword: ''
        },
        validationSchema: Yup.object().shape({
            newPassword: Yup.string().required('Password is required').min(6, 'Password is 6 characters minimum'),
            confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords don\'t match')
        }),
        onSubmit: async({ password }) => {
            try {
                setSecurityLoading(true);
                await updateAccount(null, null, null, password);
                setSecurityLoading(false);
                setAlert({ type: 'success', text: 'Password updated successfully' });
                setTimeout(() => setAlert(null), 5000);
            } catch(err) {
                setSecurityLoading(false);
                setAlert({ type: 'failure', text: 'Error occured! Try again later' });
                setTimeout(() => setAlert(null), 5000);
            } finally {
                securityForm.resetForm();
            }
        }
    });
    
    return (
        <>
            {
                user ?
                    <Container darkMode={darkMode}>
                        <div id='section-header'>
                            <h1>Settings</h1>
                            <Button text='Cancel' onClick={() => history.push('/')} />
                        </div>
                        { alert && <Alert type={alert.type} text={alert.text} /> }
                        <form id="main-info" onSubmit={mainInfoForm.handleSubmit}>
                            <h2>Main Info</h2>
                            <div id='form'>
                                <Photo darkMode={darkMode} setAlert={setAlert} />
                                <div id="inputs">
                                    <input 
                                        type='text'
                                        name='username'
                                        placeholder='Username'
                                        value={mainInfoForm.values.username}
                                        onChange={mainInfoForm.handleChange}
                                        onBlur={mainInfoForm.handleBlur}
                                    />
                                    { mainInfoForm.errors.username && mainInfoForm.touched.username && <p className='error'>{mainInfoForm.errors.username}</p> }
                                    <input 
                                        type='email' 
                                        name='email' 
                                        placeholder='Email' 
                                        value={mainInfoForm.values.email} 
                                        onChange={mainInfoForm.handleChange} 
                                        onBlur={mainInfoForm.handleBlur} 
                                    />
                                    { mainInfoForm.errors.email && mainInfoForm.touched.email && <p className='error'>{mainInfoForm.errors.email}</p> }
                                </div>
                            </div>
                            <Button mode='form' text={mainInfoLoading ? <InlineLoader /> : 'Save'} />
                        </form>
                        <form id="security" onSubmit={securityForm.handleSubmit}>
                            <h2>Security</h2>
                            <div id="form">
                                <input 
                                    type='password'
                                    name='newPassword' 
                                    placeholder='New Password' 
                                    value={securityForm.values.newPassword} 
                                    onChange={securityForm.handleChange} 
                                    onBlur={securityForm.handleBlur}
                                />
                                { securityForm.errors.newPassword && securityForm.touched.newPassword && <p className='error'>{securityForm.errors.newPassword}</p> }
                                <input 
                                    type='password'
                                    name='confirmNewPassword' 
                                    placeholder='Confirm New Password' 
                                    value={securityForm.values.confirmNewPassword} 
                                    onChange={securityForm.handleChange} 
                                    onBlur={securityForm.handleBlur}
                                />
                                { securityForm.errors.confirmNewPassword && securityForm.touched.confirmNewPassword && <p className='error'>{securityForm.errors.confirmNewPassword}</p> }
                            </div>
                            <Button mode='form' text={securityLoading ? <InlineLoader /> : 'Save'} />
                        </form>
                        <div id="danger-zone">
                            <h2>Danger Zone</h2>
                            <Button mode='danger' text='Delete Account' onClick={async() => {
                                try {
                                    await deleteAccount();
                                    history.push('/');
                                } catch(err) {
                                    console.log(err);
                                    setAlert({ type: 'failure', text: 'Error occured deleting account! Try again later' });
                                    setTimeout(() => setAlert(null), 5000);
                                }
                            }} />
                        </div>
                    </Container>
                : <Redirect to='/' />
            }
            { reAuth && <Authenticate close={() => setReAuth(false)} /> }
        </>
    )
};

export default Settings;
