import React, { useRef } from 'react';
import styled from 'styled-components';
import { ReactMediaRecorder } from 'react-media-recorder';
import Streamer from '../components/Streamer';

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
`;

const Stream = () => {
    const videoRef = useRef(null);

    return (
        <Container>
            <h1>Stream</h1>
            <ReactMediaRecorder
                video
                render={({ previewStream }) => (
                    <>
                        <Streamer
                            autoplay={true}
                            muted={true}
                            controls={false}
                            video={videoRef}
                            stream={previewStream}
                        />
                    </>
                )}
            >
            </ReactMediaRecorder>
        </Container>
    );
}
 
export default Stream;