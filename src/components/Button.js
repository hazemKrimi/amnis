import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
    cursor: pointer;
    border: none;
    box-sizing: border-box;
    color: ${({ mode }) => mode === 'action' || mode === 'form' ? '#FFFFFF' : 'inherit'};
    background: ${({ mode }) => mode === 'action' || mode === 'form' ? '#FF4A4A' : 'none'};
    font-weight: ${({ mode }) => mode === 'action' || mode === 'form' ? '400' : '600'};
    width: ${({ mode }) => mode === 'form' ? '100%' : 'initial'};
    font-size: 1rem;
    padding: ${({ mode }) => mode === 'form' ? '1rem 2rem' : '0.5rem 2rem'};
    transition: none;
`;

const Button = ({ text, mode, onClick }) => {
    return ( 
        <Btn mode={mode} onClick={() => onClick && onClick()} type='submit'>{text}</Btn>
    );
}
 
export default Button;