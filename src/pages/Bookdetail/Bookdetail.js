import React, { useCallback, useEffect, useState } from 'react';
import './Bookdetail.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import noimg from './img/noimg.jpeg';

const Bookdetail = () => {
    const [book, setBook] = useState();
    const books = useSelector((state) => state.books.books);
    const { id } = useParams();

    const getBook = useCallback(() => {
        setBook(books.find((c) => c.id === id));
    }, [books, id]);

    useEffect(() => {
        getBook();
    }, [getBook]);

    return (
        <div className='book'>
            <div className='book__img'>
                <img
                    src={book?.volumeInfo?.imageLinks?.thumbnail || noimg}
                    alt=''
                />
            </div>
            <div className='book__content'>
                <p className='book__category'>
                    {book?.volumeInfo.categories?.join(',') || 'No category'}
                </p>
                <p className='book__title'>{book?.volumeInfo.title}</p>
                <p className='book__authors'>
                    {book?.volumeInfo.authors || 'No authors'}
                </p>
                <p className='book__description'>
                    {book?.volumeInfo.description || 'No description'}
                </p>
            </div>
        </div>
    );
};

export default Bookdetail;
