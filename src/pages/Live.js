import React, { useState, useEffect, useContext, useRef } from 'react';
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

    h1 {
        font-family: 'Poppins';
        font-size: 40;
    }

    .info {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;

        .meta {
            grid-template-columns: 1fr;
            row-gap: 2rem;
        }

        .data {
            grid-template-columns: 1fr;
            row-gap: 2rem;

            .views {
                justify-self: flex-end;
                color: #FFFFFF;
                display: grid;
                grid-template-columns: repeat(2, auto);
                justify-content: flex-end;
                align-items: center;
                column-gap: 0.5rem;

                .eye {
                    cursor: auto;
                    width: 1.5rem;
                    height: 1.5rem;
                }

                p {
                    color: ${({ darkMode }) => darkMode ? '#FFFFFF' : '#07070A'};
                }
            }

            .settings {
                margin-top: 1rem;
                justify-self: flex-end;
                display: grid;
                grid-template-columns: repeat(1, 1.5rem);
                justify-content: flex-end;
                align-items: center;
                column-gap: 1rem;
                
                svg {
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
        }
    }

    .user {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        column-gap: 1rem;

        .profile {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: ${({ darkMode }) => darkMode ? '#24272B' : '#F3F4F9'};
            display: grid;
            justify-items: center;
            align-items: center;

            .avatar {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
            }

            svg {
                width: 3rem;
                height: 3rem;
            }
        }
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

const Live = () => {
    const { darkMode, getVideo, incrementVideoViews } = useContext(MainContext);
    const { id } = useParams();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ video, setVideo ] = useState(null);
    const videoRef = useRef();

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const videoData = await getVideo(id);
                setVideo(videoData);
                await incrementVideoViews(video);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError('Error occured loading video! Try again later');
                console.error(err);
            }
        })();
        // eslint-disable-next-line
    }, []);

    return !loading ? (
        <Container darkMode={darkMode}>
            {
                video && !error ? (
                    <>
                        <h1>Live</h1>
                        <Player
                            autoplay={true}
                            controls={true}
                            video={videoRef}
                        />
                        <div className='info'>
                            <div className='meta'>
                                <h1>{video && video.title}</h1>
                                <h3>{video && video.description}</h3>
                            </div>
                            <div className="data">
                                <div className='views'>
                                    <svg className='eye' viewBox="0 0 26.292 19.667">
                                        <g transform='translate(0 -3)'>
                                            <path d="M1,12.833S5.417,4,13.146,4s12.146,8.833,12.146,8.833-4.417,8.833-12.146,8.833S1,12.833,1,12.833Z" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            <circle cx="3.5" cy="3.5" r="3.5" transform="translate(10 9)" strokeWidth="2" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </g>
                                    </svg>
                                    <p>{video && video.views}</p>
                                </div>
                            </div>
                        </div>
                        <div className='user'>
                            <div className='profile'>
                                {
                                    video && video.user.photoURL ? (
                                        <div className='avatar' style={{ backgroundImage: `url(${video && video.user.photoURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    ) : (
                                        <svg viewBox="0 0 34 34">
                                            <g transform="translate(1 1.247)">
                                                <path d="M36,27.916V23.61C36,18.855,32.418,15,28,15H12c-4.418,0-8,3.855-8,8.61v4.305" transform="translate(-4 3.838)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                <ellipse cx="8" cy="9" rx="8" ry="9" transform="translate(8 -0.247)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            </g>
                                        </svg>
                                    )
                                }
                            </div>
                            <h3>{video && video.user.displayName}</h3>
                        </div>
                    </>
                ) : <div className='error'><h1>{error}</h1></div>
            }
        </Container>
    ) : <Loader />;
}
 
export default Live;