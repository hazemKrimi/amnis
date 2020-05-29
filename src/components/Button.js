import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
    cursor: pointer;
    border: none;
    box-sizing: border-box;
    color: ${({ mode }) => mode === 'action' ? '#FFFFFF' : 'inherit'};
    background: ${({ mode }) => mode === 'action' ? '#FF4A4A' : 'none'};
    font-weight: ${({ mode }) => mode === 'action' ? '400' : '600'};
    font-size: 1rem;
    padding: 0.5rem 2rem;
`;

const Button = ({ text, mode, onClick }) => {
    return ( 
        <Btn mode={mode} onClick={onClick}>{text}</Btn>
    );
}
 
export default Button;