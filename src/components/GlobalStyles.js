import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { MainContext } from '../contexts/MainContext';

const Styles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: none;
        outline: none;
        white-space: nowrap;
        font-family: 'Open Sans';
        color: ${({ darkMode }) => darkMode ? '#FFFFFF' : '#07070A'};
        transition: color linear 0.2s, background-color linear 0.2s;
    }

    svg {
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
    }

    body {
        background-color: ${({ darkMode }) => darkMode ? '#24272B' : '#F3F4F9'};
    }
`;

const GlobalStyles = () => {
    const { darkMode } = useContext(MainContext);

    return <Styles darkMode={darkMode}/>
};

export default GlobalStyles;