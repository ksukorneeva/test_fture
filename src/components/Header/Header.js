import React from 'react';
import './Header.scss';
import Input from '../UI/Input/Input.js';
import Dropdown from '../UI/Dropdown/Dropdown';

const Header = ({
    value,
    change,
    search,
    keyPress,
    categories,
    sorts,
    sortCategoryHandler,
    sortSortsHandler,
}) => {
    return (
        <header className='header'>
            <h1>Search for book</h1>
            <Input
                value={value}
                change={change}
                search={search}
                keyPress={keyPress}
            />
            <div className='header__selects'>
                <Dropdown
                    arr={categories}
                    title='Categories'
                    sortCategoryHandler={sortCategoryHandler}
                />
                <Dropdown
                    arr={sorts}
                    title='Sorts'
                    sortSortsHandler={sortSortsHandler}
                />
            </div>
        </header>
    );
};

export default Header;
