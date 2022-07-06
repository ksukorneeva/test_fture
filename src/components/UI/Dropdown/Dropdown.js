import React, { useState } from 'react';
import './Dropdown.scss';
import { useDispatch } from 'react-redux';
import { sortCategory } from '../../../store/reducers/booksReducer';

const Dropdown = ({ arr, title }) => {
    const [open, setOpen] = useState(false);
    const [sortName, setSortName] = useState(arr[0]); // arr[0]
    const dispatch = useDispatch();

    const openItems = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };

    const enterHandler = (book) => {
        setSortName(book);
        setOpen(!open);
        title === 'Categories' && dispatch(sortCategory(book));
    };

    return (
        <div className={open ? 'dropdown dropdown_show' : 'dropdown'}>
            <h3 className='dropdown__title'>{title}</h3>
            <p onClick={openItems} className='dropdown__selected'>
                {sortName}
            </p>

            <div className='dropdown__items items'>
                {arr.map((item, index) => (
                    <p
                        key={index}
                        onClick={() => enterHandler(item)}
                        className='dropdown__item'
                    >
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
