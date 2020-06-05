import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';

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
        grid-template-columns: auto;
        row-gap: 2rem;
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
            padding: 1rem 10rem 1rem 0.5rem;
            font-size: 1rem;
            font-weight: 400;

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
`;

const LogIn = ({ close }) => {
    const { darkMode } = useContext(MainContext);
    const { logIn } = useContext(AuthContext);
    const ref = useRef();

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
            <Form ref={ref} darkMode={darkMode}>
                <svg viewBox="0 0 20.828 20.828" onClick={() => close()}>
                    <g id="x" transform="translate(-4.586 -4.586)">
                        <line x1="18" y2="18" transform="translate(6 6)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <line x2="18" y2="18" transform="translate(6 6)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                </svg>
                <div>
                    <h2>Log In</h2>
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <Button text='Log In' mode='form' onClick={() => { close(); logIn(); }} />
                </div>
            </Form>
        </Overlay>
    );
}

export default LogIn;