import React, { useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import Search from './Search';
import Button from './Button';

const Navbar = styled.nav`
    width: 100%;
    height: 70px;
    background-color: ${({ darkMode }) => darkMode ? '#4A525A' : '#FFFFFF'};
    display: grid;
    
    nav {
        width: 90%;
        margin: auto;
        display: grid;
        grid-template-columns: 1fr 1.5fr 1fr;
        column-gap: 3rem;
        align-items: center;

        h2 {
            font-family: 'Poppins';
            font-size: 40;
            font-weight: bold;
        }

        #buttons {
            width: 100%;
            margin: 0;
            diplay: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 1rem;
            justify-items: flex-end;

            svg {
                width: 2rem;
                height: 2rem;
                cursor: pointer;
            }
        }
    }
`;

const Nav = () => {
    const { darkMode, toggleDarkMode } = useContext(MainContext);

    return ( 
        <Navbar darkMode={darkMode}>
            <nav>
                <h2>Amnis</h2>
                <Search />
                <nav id="buttons">
                    {
                        darkMode ?
                            <svg id="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.001 34.001" onClick={() => toggleDarkMode()}>
                                <path
                                    d="M35.038,20.441A16.034,16.034,0,1,1,17.6,3,12.471,12.471,0,0,0,35.038,20.441Z"
                                    transform="translate(-2.037 -2)"
                                    stroke="#FFFFFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                            :
                            <svg id="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" onClick={() => toggleDarkMode()}>
                                <circle cx="9" cy="9" r="9" transform="translate(11 11)" strokeWidth="2" stroke="#07070A" strokeLinecap="round" strokeLinejoin="round" />
                                <line y2="3" transform="translate(20 1)" fill="none" stroke="#07070A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <line y2="3" transform="translate(20 36)" fill="none" stroke="#07070A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <line x2="2.453" y2="2.453" transform="translate(6.562 6.562)" fill="none" stroke="#07070A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <line x2="2.453" y2="2.453" transform="translate(30.985 30.985)" fill="none" stroke="#07070A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <line x2="3" transform="translate(1 20)" fill="none" stroke="#07070A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <line x2="3" transform="translate(36 20)" fill="none" stroke="#07070A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <line y1="2.453" x2="2.453" transform="translate(6.562 30.985)" fill="none" stroke="#07070A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <line y1="2.453" x2="2.453" transform="translate(30.985 6.562)" fill="none" stroke="#07070A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                    }
                    <Button text='Log In' />
                    <Button text='Sign Up' mode='action' />
                </nav>
            </nav>
        </Navbar>
    );
}
 
export default Nav;