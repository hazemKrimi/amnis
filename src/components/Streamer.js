import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoContainer = styled.div`
    .vjs-amnis.video-js {

        * {
            outline: none;
        }

        .vjs-control-bar {
            display: none;
        }
    }
`;

const Streamer = props => {
    const [ streamer, setStreamer ] = useState();

    useEffect(() => {
        setStreamer(videojs(props.video.current, props));

        if (props.video.current && props.stream) {
            props.video.current.srcObject = props.stream;
        }

        return () => !props.stream && streamer && streamer.dispose();
        // eslint-disable-next-line
    }, [props.stream]);

    return (
        <VideoContainer>
            <div data-vjs-player>
                <video 
                    ref={props.video}
                    className='video-js vjs-amnis vjs-fluid vjs-big-play-centered'
                >
                </video>
            </div>
        </VideoContainer>
    );
}
 
export default Streamer;