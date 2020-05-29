import React, { useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';

const Spinner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 3px solid ${darkMode => darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(7, 7, 10, 0.3)'};
    border-top-color: ${darkMode => darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(7, 7, 10, 1)'};
    animation: anim 0.7s infinite linear;

    @keyframes anim {
        to { transform: rotate(360deg) }
    }
`;

const Loader = () => {
    const { darkMode } = useContext(MainContext);

    return (
        <Spinner darkMode={darkMode}></Spinner>
    )
};

export default Loader;