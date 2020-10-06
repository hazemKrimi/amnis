import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import InlineLoader from '../components/InlineLoader';

const Form = styled.form`
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

    .error {
        color: #FF4A4A;
        font-size: 0.8rem;
        width: 35vw;
        overflow-wrap: break-word;
    }
`;

const StreamForm = ({ start, stop, add, setId, playing, loading, darkMode, setPlaying }) => {
    const streamForm = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required')
        }),
        onSubmit: async ({ title, description }) => {
            try {
                const videoId = await add(title, description);
                setId(videoId);
            } catch (err) {
                console.error(err);
                throw err;
            }
        }
    });

    return (
        <Form darkMode={darkMode} onSubmit={event => {
            event.preventDefault();
            try {
                if (!playing) {
                    streamForm.handleSubmit();
                    if (streamForm.values.title && streamForm.values.description) {
                        start();
                        setPlaying(true);
                    }
                } else {
                    stop();
                    setPlaying(false);
                }
            } catch (err) {
                console.error(err);
                throw err;
            }
        }}>
            <input
                type='text'
                name='title'
                placeholder='Title'
                value={streamForm.values.title}
                onChange={streamForm.handleChange}
                onBlur={streamForm.handleBlur}
            />
            { streamForm.errors.title && streamForm.touched.title && <p className='error'>{streamForm.errors.title}</p>}
            <input
                type='text'
                name='description'
                placeholder='Description'
                value={streamForm.values.description}
                onChange={streamForm.handleChange}
                onBlur={streamForm.handleBlur}
            />
            { streamForm.errors.description && streamForm.touched.description && <p className='error'>{streamForm.errors.description}</p>}
            <Button mode='form' text={loading ? <InlineLoader /> : playing ? 'Stop' : 'Start'} />
        </Form>
    );
}
 
export default StreamForm;