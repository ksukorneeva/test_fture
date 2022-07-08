import React, { useState } from 'react';
import './Dropdown.scss';
import { useDispatch } from 'react-redux';
import { sortCategory, sortSorts } from '../../../store/reducers/booksReducer';

const Dropdown = ({ arr, title, sortCategoryHandler, sortSortsHandler }) => {
    const [open, setOpen] = useState(false);
    const [sortName, setSortName] = useState(arr[0]); // arr[0]
    const dispatch = useDispatch();
    // const categoryName = useSelector((state) => state.books.sortNameCategory);

    const openItems = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };

    const enterHandler = (book) => {
        if (title === 'Categories') {
            sortCategoryHandler(book);
            dispatch(sortCategory(book));
        }
        if (title === 'Sorts') {
            sortSortsHandler(book);
            dispatch(sortSorts(book));
        }
        console.log(book);
        setSortName(book);
        setOpen(!open);
        // title === 'Categories' && dispatch(sortCategory(book));
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
