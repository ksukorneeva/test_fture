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
    chooseCategory,
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
                    chooseHandler={chooseCategory}
                />
                <Dropdown arr={sorts} title='Sorts' />
            </div>
        </header>
    );
};

export default Header;
