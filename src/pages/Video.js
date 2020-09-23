import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { UserContext } from '../contexts/UserContext';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Player from '../components/Player';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

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

const Video = () => {
    const { darkMode, getVideo, incrementVideoViews, deleteVideo } = useContext(MainContext);
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [ loading, setLoading ] = useState(false);
    const [ video, setVideo ] = useState(null);
    const [ error, setError ] = useState('');
    const [ alert, setAlert ] = useState(null);
    const history = useHistory();

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const video = await getVideo(id);
                setVideo(video);
                await incrementVideoViews(video);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                setError('Error occured loading video! Try again later');
            }
        })();
        // eslint-disable-next-line
    }, []);

    return !loading ? (
        <Container darkMode={darkMode}>
            { alert && <Alert type={alert.type} text={alert.text} /> }
            {
                video && !error ? (
                    <>
                        <div>
                            <h1>Video</h1>
                        </div>
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
                                {
                                    video && video.user.email === user.email && (
                                        <div className="settings">
                                            <svg viewBox="0 0 50.299 55.666" onClick={async() => {
                                                try {
                                                    await deleteVideo(video.id);
                                                    history.push('/');
                                                } catch(err) {
                                                    setAlert({ type: 'failure', text: 'Error deleting video! Try again later' });
                                                    setTimeout(() => setAlert(null), 5000);
                                                }
                                            }}>
                                                <g transform="translate(-2 -1)">
                                                    <path d="M3,6H51.3" transform="translate(0 6.733)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                    <path d="M42.566,12.733V50.3A5.367,5.367,0,0,1,37.2,55.666H10.367A5.367,5.367,0,0,1,5,50.3V12.733m8.05,0V7.367A5.367,5.367,0,0,1,18.417,2H29.15a5.367,5.367,0,0,1,5.367,5.367v5.367" transform="translate(3.367 0)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                    <line y2="16" transform="translate(22 26)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                    <line y2="16" transform="translate(33 26)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                </g>
                                            </svg>
                                        </div>
                                    )
                                }
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
 
export default Video;