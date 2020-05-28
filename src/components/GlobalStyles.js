import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { MainContext } from '../contexts/MainContext';

const GlobalStyles = () => {
    const { darkMode } = useContext(MainContext);

    const Styles = createGlobalStyle`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Poppins:wght@700&display=swap');

        * {
            margin: 0;
            padding: 0;
        }

        body {
            background-color: ${darkMode ? '#24272B' : '#F3F4F9'};
            color: ${darkMode ? '#FFFFFF' : '#07070A'};
            font-family: 'Open Sans';
        }
    `;

    return <Styles />
};

export default GlobalStyles;