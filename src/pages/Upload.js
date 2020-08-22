import React, { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Container = styled.div`
    width: 90%;
    margin: 3rem auto;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;

    h2 {
        font-family: 'Poppins';
        font-size: 40;
    }

    #section-header {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        button {
            justify-self: flex-end;
            font-size: 40;
            padding: 0;
        }
    }

    #files {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        align-items: center;
        column-gap: 2rem;

        .file-upload {
            cursor: pointer;
            display: grid;
            justify-content: center;
            align-items: center;
            height: 15rem;
            border: 3px dashed ${({ darkMode }) => darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(7, 7, 10, 1)'};

            h2 {
                font-family: 'Poppins';
                font-size: 30;
                cursor: pointer;
            }
        }
    }

    #inputs {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 1rem;
        justify-content: center;
        align-items: center;

        input {
            background: ${({ darkMode }) => darkMode ? 'rgba(74, 82, 90, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
            border: none;
            color: ${({ darkMode }) => darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(7, 7, 10, 1)'};
            width: 100%;
            padding: 1rem 0.5rem;
            font-size: 1rem;
            font-weight: 400;

            &::placeholder {
                font-size: 1rem;
            }
        }
    }

    .error {
        color: #FF4A4A;
        font-size: 0.8rem;
        width: 35vw;
        overflow-wrap: break-word;
    }
`;

const Upload = () => {
    const { user } = useContext(UserContext);
    const { darkMode, addVideo } = useContext(MainContext);
    const history = useHistory();

    const videoUploadForm = useFormik({
        initialValues: {
            title: '',
            description: '',
            videoName: '',
            thumbnailName: ''
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            videoName: Yup.string().required('Video is required'),
            thumbnailName: Yup.string().required('Thumbnail is required')
        }),
        onSubmit: async({ title, description, video, thumbnail }, { setFieldError }) => {
            try {
                await addVideo(title, description, video, thumbnail);
                alert('Video uploaded successfully');
            } catch(err) {
                setFieldError('upload', err.message);
            }
        }
    });

    return (
        <form onSubmit={videoUploadForm.handleSubmit}>
            {
                user ?
                    <Container darkMode={darkMode}>
                        <div id='section-header'>
                            <h2>Upload</h2>
                            <Button text='Cancel' onClick={() => history.push('/')} />
                        </div>
                        <div id="files">
                            <label htmlFor="video">
                                <div className='file-upload'>
                                    <h2>{videoUploadForm.values.videoName || 'Upload video'}</h2>
                                    <input
                                        type='file'
                                        accept='video/*'
                                        name='video'
                                        id='video'
                                        style={{ display: 'none' }}
                                        onChange={event => {
                                            videoUploadForm.setFieldValue('video', event.target.files[0]);
                                            videoUploadForm.setFieldValue('videoName', event.target.files[0].name);
                                        }}
                                    />
                                </div>
                            </label>
                            {videoUploadForm.errors.videoName && videoUploadForm.touched.videoName && <p className='error'>{videoUploadForm.errors.videoName}</p>}
                            <label htmlFor="thumbnail">
                                <div className='file-upload'>
                                    <h2>{videoUploadForm.values.thumbnailName || 'Upload thumbnail'}</h2>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        name='thumbnail'
                                        id='thumbnail'
                                        style={{ display: 'none' }}
                                        onChange={event => {
                                            videoUploadForm.setFieldValue('thumbnail', event.target.files[0]);
                                            videoUploadForm.setFieldValue('thumbnailName', event.target.files[0].name);
                                        }}
                                    />
                                </div>
                            </label>
                        </div>
                        { videoUploadForm.errors.thumbnailName && videoUploadForm.touched.thumbnailName && <p className='error'>{videoUploadForm.errors.thumbnailName}</p> }
                        <div id='inputs'>
                            <input 
                                type='text'
                                name='title'
                                placeholder='Title'
                                value={videoUploadForm.values.title} 
                                onChange={videoUploadForm.handleChange} 
                                onBlur={videoUploadForm.handleBlur} 
                            />
                            { videoUploadForm.errors.title && videoUploadForm.touched.title && <p className='error'>{videoUploadForm.errors.title}</p> }
                            <input 
                                type='text'
                                name='description'
                                placeholder='Description'
                                value={videoUploadForm.values.description}
                                onChange={videoUploadForm.handleChange}
                                onBlur={videoUploadForm.handleBlur} 
                            />
                            { videoUploadForm.errors.description && videoUploadForm.touched.description && <p className='error'>{videoUploadForm.errors.description}</p> }
                            <Button mode='form' text='Submit' />
                            { videoUploadForm.errors.upload && <p className='error'>{videoUploadForm.errors.upload}</p> }
                        </div>
                    </Container>
                    : <Redirect to='/' />
            }
        </form>
    )
};

export default Upload;
