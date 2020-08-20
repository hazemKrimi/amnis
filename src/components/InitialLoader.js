import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(7, 7, 10, 0.3);
    border-top-color: rgba(7, 7, 10, 1);
    animation: anim 0.7s infinite linear;

    @keyframes anim {
        to { transform: rotate(360deg) }
    }
`;

const Loader = () => (
    <Spinner></Spinner>
);

export default Loader;