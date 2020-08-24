import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    height: auto;
    width: 100%;
    display: grid;
    align-items: center;
    padding: 0.75rem 1.25rem;
    color: ${({ type }) => type === 'success' ? '#155724' : '#721C24'};
    background: ${({ type }) => type === 'success' ? '#D4EDDA' : '#F8D7DA'};
    border: 1px solid ${({ type }) => type === 'success' ? '#C3E6CB' : '#F5C6CB'};
`;

const Alert = ({ text, type }) => {
    return (
        <Div type={type}>{text}</Div>
    );
}
 
export default Alert;