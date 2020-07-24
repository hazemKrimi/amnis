import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import Button from './Button';
import Menu from './Menu';
import SignUp from './SignUp';
import LogIn from './LogIn';

const Navbar = styled.nav`
    width: 100%;
    height: 70px;
    background-color: ${({ darkMode }) => darkMode ? '#4A525A' : '#FFFFFF'};
    display: grid;
    
    nav {
        width: 90%;
        margin: auto;
        display: grid;
        grid-template-columns: 1fr repeat(2, 1.5fr);
        column-gap: 3rem;
        align-items: center;

        @media (min-width: 1440px) {
            grid-template-columns: 0.5fr 1fr 0.5fr;
        }

        h2 {
            font-family: 'Poppins';
            cursor: pointer;
        }

        #buttons {
            width: 100%;
            margin: 0;
            diplay: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 1rem;
            justify-items: flex-end;

            @media (min-width: 1440px) {
                grid-template-columns: repeat(2, 1fr) 1.2fr;
            }

            #create {
                cursor: pointer;
                display: grid;
                align-items: center;
            }

            #profile {
                cursor: pointer;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                background: ${({ darkMode }) => darkMode ? '#24272B' : '#F3F4F9'};
                display: grid;
                justify-items: center;
                align-items: center;

                svg {
                    width: 1.25rem;
                    height: 1.25rem;
                }
            }
        }
    }
`;

const Nav = () => {
    const { darkMode, toggleDarkMode } = useContext(MainContext);
    const { user } = useContext(UserContext);
    const [ create, setCreate ] = useState(false);
    const [ profile, setProfile ] = useState(false);
    const [ showSignUp, setSignUp ] = useState(false);
    const [ showLogIn, setLogIn ] = useState(false);
    const [ createPosition, setCreatePosition ] = useState(null);
    const [ profilePosition, setProfilePosition ] = useState(null);
    const createRef = useRef();
    const profileRef = useRef();
    const history = useHistory();

    return ( 
        <>
            <Navbar darkMode={darkMode}>
                <nav>
                    <h2 onClick={() => history.push('/')}>Amnis</h2>
                    <Search />
                    <nav id="buttons">
                        {
                            darkMode ?
                                <svg id="moon" viewBox="0 0 34.001 34.001" onClick={() => toggleDarkMode()}>
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
                                <svg id="sun" viewBox="0 0 40 40" onClick={() => toggleDarkMode()}>
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
                        {
                            user ? (
                                <>
                                    <div id="create" ref={createRef} onClick={() => { setCreatePosition({ left: createRef.current.offsetLeft, top: createRef.current.offsetTop, width: createRef.current.offsetWidth, height: createRef.current.offsetHeight }); setCreate(true); setProfile(false); }}>
                                        <svg viewBox="0 0 34 34">
                                            <g id="plus-circle" transform="translate(-1 -1)">
                                                <circle cx="16" cy="16" r="16" transform="translate(2 2)" strokeWidth="2" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                <line y2="14" transform="translate(18 11)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                <line x2="14" transform="translate(11 18)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div id="profile" ref={profileRef} onClick={() => { setProfilePosition({ left: profileRef.current.offsetLeft, top: profileRef.current.offsetTop, width: profileRef.current.offsetWidth, height: profileRef.current.offsetHeight }); setProfile(true); setCreate(false); }}>
                                        <svg viewBox="0 0 34 34">
                                            <g transform="translate(1 1.247)">
                                                <path d="M36,27.916V23.61C36,18.855,32.418,15,28,15H12c-4.418,0-8,3.855-8,8.61v4.305" transform="translate(-4 3.838)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                <ellipse cx="8" cy="9" rx="8" ry="9" transform="translate(8 -0.247)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            </g>
                                        </svg>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Button text='Log In' onClick={() => setLogIn(true)} />
                                    <Button text='Sign Up' mode='action' onClick={() => setSignUp(true)} />
                                </>
                            )
                        }
                    </nav>
                </nav>
            </Navbar>
            { user && create && <Menu type='create' position={createPosition} close={() => setCreate(false)} /> }
            { user && profile && <Menu type='profile' position={profilePosition} close={() => setProfile(false)} /> }
            { !user && showSignUp && <SignUp close={() => setSignUp(false)} /> }
            { !user && showLogIn && <LogIn close={() => setLogIn(false)} /> }
        </>
    );
}
 
export default Nav;