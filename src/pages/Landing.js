import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/MainContext';
import styled from 'styled-components';
import Alert from '../components/Alert';

const Container = styled.div`
    width: 90%;
    margin: 3rem auto;

    h2 {
        font-family: 'Poppins';
        font-size: 40;
    }
`;

const Landing = () => {
    const { getVideos } = useContext(MainContext);
    const [ alert, setAlert ] = useState(null);

    useEffect(() => {
        (async() => {
            try {
                await getVideos();
            } catch(err) {
                setAlert({ type: 'failure', text: 'Error occured! Try again later' });
                setTimeout(() => setAlert(null), 5000);
            }
        })();
        // eslint-disable-next-line
    }, []);

    return (
        <Container>
            { alert && <Alert type={alert.type} text={alert.text} /> }
            <h2>Recent Videos</h2>
        </Container>
    )
};

export default Landing;