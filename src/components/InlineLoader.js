import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: rgba(255, 255, 255, 1);
    animation: anim 0.7s infinite linear;

    @keyframes anim {
        to { transform: rotate(360deg) }
    }
`;

const InlineLoader = () => <Spinner></Spinner>;

export default InlineLoader;