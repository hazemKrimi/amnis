import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Player from '../components/Player';
import Loader from '../components/Loader';

const Container = styled.div`
    width: 90%;
    margin: 3rem auto;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
`;

const Video = () => {
    const { getVideo } = useContext(MainContext);
    const { id } = useParams();
    const [ loading, setLoading ] = useState(false);
    const [ video, setVideo ] = useState(null);

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                setVideo(await getVideo(id));
                setLoading(false);
            } catch(err) {
                setLoading(false);
                alert(err);
            }
        })();
        // eslint-disable-next-line
    }, []);

    return !loading ? (
        <Container>
            <Player
                autoplay={false}
                controls={true}
                sources={[
                    { 
                        src: video && video.source,
                        type: 'video/mp4'
                    }
                ]}
            />
        </Container>
    ) : <Loader />;
}
 
export default Video;