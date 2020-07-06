import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    justify-content: center;
    align-content: center;
`;

const Form = styled.form`
    background: ${({ darkMode }) => darkMode ? '#24272B' : '#F3F4F9'};
    padding: 0.5rem 2rem 2rem 2rem;

    @media (min-width: 1440px) {
        transform: scale(1.5);
    }

    div {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 1rem;
        justify-content: center;
        align-items: center;

        h2 {
            font-family: 'Poppins';
            text-align: center;
        }

        input {
            background: ${({ darkMode }) => darkMode ? 'rgba(74, 82, 90, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
            border: none;
            color: ${({ darkMode }) => darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(7, 7, 10, 1)'};
            width: 35vw;
            padding: 1rem 0.5rem;
            font-size: 1rem;
            font-weight: 400;

            @media (min-width: 1440px) {
                width: 30vw;
            }

            &::placeholder {
                font-size: 1rem;
            }
        }
    }

    svg {
        width: 0.8rem;
        height: 0.8rem;
        cursor: pointer;
        position: relative;
        top: 0%;
        left: 100%;
    }

    .error {
        color: #FF4A4A;
        font-size: 1rem;
    }
`;

const SignUp = ({ close }) => {
    const { darkMode } = useContext(MainContext);
    const { signUp } = useContext(AuthContext);
    const ref = useRef();

    const form = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required('Username is required'),
            email: Yup.string().required('Email is required').email('Email is invalid'),
            password: Yup.string().required('Password is required').min(6, 'Password is 6 characters minimum'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords don\'t match')
        }),
        onSubmit: async({ username, email, password }, { setFieldError }) => {
            try {
                await signUp(username, email, password);
                close();
            } catch(err) {
                setFieldError('signup', err.message);
            }
        }
    });

    useEffect(() => {
        document.addEventListener('mousedown', event => {
            if (ref.current && ref.current.contains(event.target)) {
                document.addEventListener('mouseup', event => {
                    if (ref.current && !ref.current.contains(event.target)) return;
                });
            } else {
                document.addEventListener('mouseup', event => {
                    if (ref.current && !ref.current.contains(event.target)) close();
                });
            }
        });
    });

    return (
        <Overlay>
            <Form ref={ref} darkMode={darkMode} onSubmit={form.handleSubmit}>
                <svg viewBox="0 0 20.828 20.828" onClick={() => close()}>
                    <g id="x" transform="translate(-4.586 -4.586)">
                        <line x1="18" y2="18" transform="translate(6 6)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <line x2="18" y2="18" transform="translate(6 6)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                </svg>
                <div>
                    <h2>Sign Up</h2>
                    <input type="text" name='username' placeholder='Username' value={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} />
                    { form.errors.username && form.touched.username && <p className='error'>{form.errors.username}</p> }
                    <input type="email" name='email' placeholder='Email' value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} />
                    { form.errors.email && form.touched.email && <p className='error'>{form.errors.email}</p> }
                    <input type="password" name='password' placeholder='Password' value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} />
                    { form.errors.password && form.touched.password && <p className='error'>{form.errors.password}</p> }
                    <input type="password" name='confirmPassword' placeholder='Confirm Password' value={form.values.confirmPassword} onChange={form.handleChange} onBlur={form.handleBlur} />
                    { form.errors.confirmPassword && form.touched.confirmPassword && <p className='error'>{form.errors.confirmPassword}</p> }
                    <Button text='Sign Up' mode='form' />
                    { form.errors.signup && <p className='error'>{form.errors.signup}</p> }
                </div>
            </Form>
        </Overlay>
    )
}
 
export default SignUp;