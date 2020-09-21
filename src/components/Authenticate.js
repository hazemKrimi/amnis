import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import { UserContext } from '../contexts/UserContext';
import Button from './Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: grid;
    justify-content: center;
    align-content: center;
`;

const Form = styled.form`
    background: ${({ darkMode }) => darkMode ? '#24272B' : '#F3F4F9'};
    padding: 0.5rem 2rem 2rem 2rem;

    @media (min-width: 1439px) {
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
        font-size: 0.8rem;
        width: 35vw;
    }
`;

const Authenticate = ({ close }) => {
    const { darkMode } = useContext(MainContext);
    const { reAuth } = useContext(UserContext);
    const ref = useRef();

    const form = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('Email is required').email('Email is invalid'),
            password: Yup.string().required('Password is required').min(6, 'Password is 6 characters minimum')
        }),
        onSubmit: async ({ email, password }, { setFieldError }) => {
            try {
                await reAuth(email, password);
                close();
            } catch (err) {
                setFieldError('authenticate', err.message);
            }
        }
    });

    return (
        <Overlay>
            <Form ref={ref} darkMode={darkMode} onSubmit={form.handleSubmit}>
                <div style={{ height: '0.8rem' }}></div>
                <div>
                    <h2>Authenticate</h2>
                    <input 
                        type='email' 
                        name='email' 
                        placeholder='Email' 
                        value={form.values.email} 
                        onChange={form.handleChange} 
                        onBlur={form.handleBlur}
                    />
                    { form.errors.email && form.touched.email && <p className='error'>{form.errors.email}</p> }
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Password' 
                        value={form.values.password} 
                        onChange={form.handleChange} 
                        onBlur={form.handleBlur}
                    />
                    { form.errors.password && form.touched.password && <p className='error'>{form.errors.password}</p> }
                    <Button text='Proceed' mode='form' />
                    { form.errors.authenticate && <p className='error'>{form.errors.authenticate}</p> }
                </div>
            </Form>
        </Overlay>
    );
}

export default Authenticate;