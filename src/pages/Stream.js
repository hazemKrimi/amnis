import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 90%;
    margin: 3rem auto;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;

    h1 {
        font-family: 'Poppins';
        font-size: 40;
    }

    .error {
        height: 100vh;
        display: grid;
        grid-template-rows: auto;
        justify-content: center;
        align-items: center;

        h1 {
            font-family: 'Poppins';
            text-align: center;
        }
    }
`;

const Stream = () => {
    return (
        <Container>
            <div className='error'>
                <h1>Work In Progress</h1>
            </div>
        </Container>
    );
}
 
export default Stream;