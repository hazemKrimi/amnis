import React, { useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

const SearchBar = styled.form`
    display: grid;
    grid-template-columns: 1fr auto;
    background-color: ${({ darkMode }) => darkMode ? 'rgba(7, 7, 10, 0.5)' : 'rgba(243, 244, 249, 0.5)'};

    input {
        background: none;
        border: none;
        color: ${({ darkMode }) => darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(7, 7, 10, 1)'};
        padding-left: 0.5rem;
        font-size: 1rem;
        font-weight: 400;

        &::placeholder {
            font-size: 1rem;
        }
    }

    .search-button {
        cursor: pointer;
        background-color: ${({ darkMode }) => darkMode ? 'rgba(74, 82, 90, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
        padding: 0.5rem 1rem 0.5rem 1rem;

        svg {
            width: 1.2rem;
            height: 1.2rem;
            fill: ${({ darkMode }) => darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(7, 7, 10, 0.5)'}
        }
    }    
`;

const Search = () => {
    const { darkMode } = useContext(MainContext);
    const history = useHistory();

    const form = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: async({ query }) => {
            try {
                history.push(`/search/${query}`);
            } catch(err) {
                console.log(err);
            } finally {
                form.resetForm();
            }
        }
    });

    return (
        <SearchBar darkMode={darkMode} onSubmit={form.handleSubmit}>
            <input 
                type='text' 
                name='query' 
                placeholder='Search'
                value={form.values.query}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
            />
            <div className='search-button' onClick={form.handleSubmit}>
                <svg viewBox="0 0 32 32">
                    <path 
                        d="M31.8,29.919l-9.3-9.3a12.692,12.692,0,1,0-1.885,1.885l9.3,9.3a.667.667,0,0,0,.943,0l.943-.943A.667.667,0,0,0,31.8,29.919ZM12.667,22.667a10,10,0,1,1,10-10A10.011,10.011,0,0,1,12.667,22.667Z"
                        transform="translate(0 0)"    
                    />
                </svg>
            </div>
        </SearchBar>
    );
}

export default Search;