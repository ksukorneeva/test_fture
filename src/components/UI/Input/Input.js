import React from 'react';
import './Input.scss';
import { BiSearchAlt2 } from 'react-icons/bi';

const Input = ({ value, change, search, keyPress }) => {
    return (
        <div className='form-field'>
            <input
                type='text'
                placeholder=' '
                onChange={change}
                value={value}
                onKeyDown={keyPress}
            />
            <label>Search</label>
            <BiSearchAlt2 onClick={search} />
        </div>
    );
};

export default Input;
