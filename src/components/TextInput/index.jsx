import React from 'react';
import P from 'prop-types';

import './style.css';

export const TextInput = ({searchValue, handleChange}) => {
    return (
        <input 
            className='text-input'
            placeholder='Pesquisa'
            type="search" 
            onChange={handleChange} 
            value={searchValue}
        />
    );
}

TextInput.propTypes = {
    searchValue: P.string.isRequired,
    handleChange: P.func.isRequired,
}