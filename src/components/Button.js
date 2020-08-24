import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
    cursor: pointer;
    border: none;
    box-sizing: border-box;
    display: grid;
    justify-content: center;
    align-items: center;
    color: ${({ mode }) => mode === 'action' || mode === 'form' ? '#FFFFFF' : mode === 'danger' ? '#FF4A4A' : 'inherit'};
    background: ${({ mode }) => mode === 'action' || mode === 'form' ? '#FF4A4A' : 'none'};
    font-weight: ${({ mode }) => mode === 'action' || mode === 'form' ? '400' : '600'};
    border: ${({ mode }) => mode === 'danger' ? '1px solid #FF4A4A' : 'none'};;
    width: ${({ mode }) => mode === 'form' ? '100%' : 'initial'};
    font-size: 1rem;
    padding: ${({ mode }) => mode === 'form' || mode === 'danger' ? '1rem 2rem' : '0.5rem 2rem'};
    transition: none;
`;

const Button = ({ text, mode, onClick }) => {
    return ( 
        <Btn mode={mode} onClick={() => onClick && onClick()} type='submit'>{text}</Btn>
    );
}
 
export default Button;