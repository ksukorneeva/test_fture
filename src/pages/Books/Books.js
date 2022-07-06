import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Books.scss';
import noimg from '../Bookdetail/img/noimg.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import IsLoading from '../../components/UI/IsLoading/IsLoading';
import { addBooks } from '../../store/reducers/booksReducer';

const Books = ({ result, click, loading, loadingButton }) => {
    const navigate = useNavigate();
    const books = useSelector((state) => state.books.books);
    const categoryName = useSelector((state) => state.books.sortNameCategory);
    const booksCopy = [...books];
    const dispatch = useDispatch();

    const sortCategoryHandler = (name) => {
        const newBooks = books.filter(
            (book) =>
                book.volumeInfo.categories?.join('').toLowerCase() === name
        );
        return dispatch(addBooks(newBooks));
    };
    console.log(books);

    // if (categoryName !== 'all') {
    //     sortCategoryHandler(categoryName);
    // }

    // useEffect(() => {
    //     if (categoryName !== 'all') {
    //         sortCategoryHandler(categoryName);
    //     }
    // }, [categoryName, sortCategoryHandler]);

    if (loading) {
        return <IsLoading />;
    }

    return (
        <>
            {books.length ? (
                <div className='books'>
                    <p className='books__count'>Found {result} results</p>

                    <div className='books__list list'>
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className='list-item'
                                onClick={() => navigate(`/${book.id}`)}
                            >
                                {/* {console.log(book.volumeInfo.authors)} */}
                                <div className='list-item__img'>
                                    <img
                                        src={
                                            book?.volumeInfo?.imageLinks
                                                ?.thumbnail || noimg
                                        }
                                        alt='img'
                                    />
                                </div>
                                <p className='list-item__category'>
                                    {book?.volumeInfo.categories?.join(',') ||
                                        'Not category'}
                                </p>
                                <p className='list-item__title'>
                                    {book?.volumeInfo.title}
                                </p>
                                <p className='list-item__authors'>
                                    {book?.volumeInfo.authors?.join(',') ||
                                        'Not author'}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button onClick={click}>
                        {loadingButton ? (
                            <IsLoading className='load-btn' />
                        ) : (
                            'Load more...'
                        )}
                    </button>
                </div>
            ) : (
                <h1>Что будем читать?</h1>
            )}
        </>
    );
};

export default Books;
