import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import videojs from 'video.js';
import Play from '../assets/play.svg';
import Pause from '../assets/pause.svg';
import Mute from '../assets/volume-muted.svg';
import Volume1 from '../assets/volume-1.svg';
import Volume2 from '../assets/volume-2.svg';
import Volume3 from '../assets/volume-3.svg';
import Maximize from '../assets/maximize.svg';
import Minimize from '../assets/minimize.svg';
import 'video.js/dist/video-js.css';

const VideoContainer = styled.div`
    .vjs-amnis.video-js {

        * {
            outline: none;
        }

        .vjs-big-play-button {
            border: none;
            background: none;
        
            .vjs-icon-placeholder:before {
                content: '';
                background-image: url(${Play});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        }

        .vjs-control-bar {
            background: none;
            margin: 0.5rem 0rem;
        }

        .vjs-play-control.vjs-paused {

            .vjs-icon-placeholder:before {
                content: '';
                background-image: url(${Play});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        }

        .vjs-play-control.vjs-playing {

            .vjs-icon-placeholder:before {
                content: '';
                background-image: url(${Pause});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        }

        .vjs-mute-control.vjs-vol-0 {

            .vjs-icon-placeholder:before {
                content: '';
                background-image: url(${Mute});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        }

        .vjs-mute-control.vjs-vol-1 {

            .vjs-icon-placeholder:before {
                content: '';
                background-image: url(${Volume1});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        }

        .vjs-mute-control.vjs-vol-2 {

            .vjs-icon-placeholder:before {
                content: '';
                background-image: url(${Volume2});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        }

        .vjs-mute-control.vjs-vol-3 {

            .vjs-icon-placeholder:before {
                content: '';
                background-image: url(${Volume3});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        }

        .vjs-volume-level:before {
            color: rgba(255, 255, 255, 1);
        }

        .vjs-progress-control .vjs-progress-holder {
            background: none;
        }

        .vjs-progress-control .vjs-play-progress {
            background: rgba(255, 255, 255, 1);

            &:before {
                color: rgba(255, 255, 255, 1);
            }
        }
        
        .vjs-progress-control .vjs-load-progress {
            background: rgba(255, 255, 255, 0.5);
        }

        .vjs-picture-in-picture-control {
            display: none;
        }

        .vjs-remaining-time {
            display: none;
        }

        .vjs-fullscreen-control {

            .vjs-icon-placeholder:before {
                content: '';
                background-image: url(${Maximize});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        }
    }

    .vjs-amnis.vjs-fullscreen .vjs-fullscreen-control {

        .vjs-icon-placeholder:before {
            content: '';
            background-image: url(${Minimize});
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
    }
`;

const Player = props => {
    const [ player, setPlayer ] = useState();
    const playerRef = useRef();

    useEffect(() => {
        setPlayer(videojs(playerRef.current, props));

        return () => player && player.dispose();
        // eslint-disable-next-line
    }, []);

    return (
        <VideoContainer>
            <div data-vjs-player>
                <video ref={playerRef} className='video-js vjs-amnis vjs-fluid vjs-big-play-centered'></video>
            </div>
        </VideoContainer>
    );
}
 
export default Player;