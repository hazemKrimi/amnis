import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import { AuthContext } from '../contexts/AuthContext';

const StyledMenu = styled.div`
    background-color: ${({ darkMode }) => darkMode ? '#24272B' : '#F3F4F9'};
    padding: 1rem 0.5rem;
    display: grid;
    grid-template-columns: auto;
    row-gap: 1rem;
    align-items: center;
    position: absolute;
    top: ${({ position }) => position.top + position.height}px;
    right: ${({ position }) => window.innerWidth - position.left - position.width}px;

    h3 {
        display: inline;
        font-weight: 600;
    }

    .menu-item {
        cursor: pointer;
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 1rem;
    }

    #logout {
        margin-top: 1rem;

        h3 {
            color: #FF4A4A;
        }
    }
`;

const Menu = ({ position, close, type }) => {
    const { darkMode } = useContext(MainContext);
    const { user, logout } = useContext(AuthContext);
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

    return type === 'profile' ? (
        <StyledMenu ref={ref} darkMode={darkMode} position={position}>
            <div className="menu-item">
                <svg viewBox="0 0 34 34">
                    <g transform="translate(1 1.247)">
                        <path d="M36,27.916V23.61C36,18.855,32.418,15,28,15H12c-4.418,0-8,3.855-8,8.61v4.305" transform="translate(-4 3.838)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <ellipse cx="8" cy="9" rx="8" ry="9" transform="translate(8 -0.247)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                </svg>
                <h3>{user.displayName}</h3>
            </div>
            <div className="menu-item">
                <svg viewBox="0 0 34 34">
                    <g transform="translate(1 1)">
                        <circle cx="3" cy="3" r="3" transform="translate(13 12.85)" strokeWidth="2" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M27.764,21.364a2.4,2.4,0,0,0,.48,2.647l.087.087a2.911,2.911,0,1,1-4.116,4.116l-.087-.087a2.419,2.419,0,0,0-4.1,1.716v.247a2.909,2.909,0,1,1-5.818,0V29.96a2.4,2.4,0,0,0-1.571-2.2,2.4,2.4,0,0,0-2.647.48l-.087.087a2.911,2.911,0,1,1-4.116-4.116l.087-.087a2.419,2.419,0,0,0-1.716-4.1H3.909a2.909,2.909,0,1,1,0-5.818H4.04a2.4,2.4,0,0,0,2.2-1.571,2.4,2.4,0,0,0-.48-2.647L5.669,9.9A2.911,2.911,0,1,1,9.785,5.785l.087.087a2.4,2.4,0,0,0,2.647.48h.116a2.4,2.4,0,0,0,1.455-2.2V3.909a2.909,2.909,0,1,1,5.818,0V4.04a2.419,2.419,0,0,0,4.1,1.716l.087-.087a2.911,2.911,0,1,1,4.116,4.116l-.087.087a2.4,2.4,0,0,0-.48,2.647v.116a2.4,2.4,0,0,0,2.2,1.455h.247a2.909,2.909,0,1,1,0,5.818H29.96A2.4,2.4,0,0,0,27.764,21.364Z" transform="translate(-1 -1)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                </svg>
                <h3>Settings</h3>
            </div>
            <div className="menu-item" id="logout" onClick={() => { close(); logout(); }}>
                <svg viewBox="0 0 30 30">
                    <g transform="translate(-2 -2)">
                        <path d="M12.333,31H6.111A3.111,3.111,0,0,1,3,27.889V6.111A3.111,3.111,0,0,1,6.111,3h6.222" transform="translate(0 0)" fill="none" stroke="#ff4a4a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path d="M16,22.556l7.778-7.778L16,7" transform="translate(7.222 2.222)" fill="none" stroke="#ff4a4a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <line x1="19" transform="translate(12 17)" fill="none" stroke="#ff4a4a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                </svg>
                <h3>Logout</h3>
            </div>
        </StyledMenu>
    ) : (
        <StyledMenu ref={ref} darkMode={darkMode} position={position}>
            <div className="menu-item">
                    <svg viewBox="0 0 36.5 36.5">
                        <g transform="translate(-2 -2)">
                            <path d="M37.5,15v7.667A3.833,3.833,0,0,1,33.667,26.5H6.833A3.833,3.833,0,0,1,3,22.667V15" transform="translate(0 11)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="M26.167,12.583,16.583,3,7,12.583" transform="translate(3.667 0)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <line y2="23" transform="translate(20 3)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </g>
                    </svg>
                <h3>Upload</h3>
            </div>
            <div className="menu-item">
                    <svg viewBox="0 0 39.333 29.229">
                        <g transform="translate(-1.002 -3.516)">
                            <circle cx="3.734" cy="3.734" r="3.734" transform="translate(16.935 14.396)" strokeWidth="2" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            <path d="M28.585,10.214a11.2,11.2,0,0,1,0,15.851m-15.833-.019a11.2,11.2,0,0,1,0-15.851M33.869,4.93a18.671,18.671,0,0,1,0,26.4m-26.4,0a18.671,18.671,0,0,1,0-26.4" transform="translate(0)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </g>
                    </svg>
                <h3>Go Live</h3>
            </div>
        </StyledMenu>
    );
}
 
export default Menu;