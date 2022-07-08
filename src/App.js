import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Bookdetail from './pages/Bookdetail/Bookdetail';
import Books from './pages/Books/Books';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
    addBooks,
    appendBooks,
    sortCategory,
} from './store/reducers/booksReducer';
import IsLoading from './components/UI/IsLoading/IsLoading';

function App() {
    const [search, setSearch] = useState('');
    const [searchCash, setSearchCash] = useState('');
    const [numberResult, setNumberResult] = useState(0);
    const [startIdx, setStartIdx] = useState(0);
    const [maxIdx] = useState(30);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const books = useSelector((state) => state.books.books);
    const categoryName = useSelector((state) => state.books.sortNameCategory);
    const sortName = useSelector((state) => state.books.sorts);

    const categories = [
        'all',
        'art',
        'biography',
        'computers',
        'history',
        'medical',
        'poetry',
    ];
    const sorts = ['relevance', 'newest'];

    const changeHandler = (e) => {
        setSearch(e.target.value);
        setSearchCash(e.target.value);
    };

    const searchForm = async () => {
        try {
            if (search) {
                setLoading(true);
                const api = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=${maxIdx}&startIndex=0&orderBy=${sortName}`;
                const data = await axios.get(api);
                setNumberResult(data.data.totalItems);
                dispatch(addBooks(data.data.items));
                setSearch('');
                setStartIdx((state) => (state += maxIdx));
                setLoading(false);
                dispatch(sortCategory('all'));
            }
        } catch (error) {
            console.log('error search books', error);
        }
    };

    const enterPressHandler = (e) => {
        if (e.key === 'Enter') {
            searchForm();
        }
    };

    const loadMoreHandler = async () => {
        setStartIdx((state) => (state += maxIdx));
        setLoadingButton(true);
        const api = `https://www.googleapis.com/books/v1/volumes?q=${searchCash}&maxResults=${maxIdx}&startIndex=${startIdx}&orderBy=${sortName}`;
        const data = await axios.get(api);
        setNumberResult(data.data.totalItems);
        if (categoryName !== 'all') {
            dispatch(
                appendBooks(
                    data.data.items.filter((book) => {
                        if (book.volumeInfo.categories) {
                            return (
                                book.volumeInfo.categories[0].toLowerCase() ===
                                categoryName
                            );
                        }
                        return [];
                    })
                )
            );
        } else {
            dispatch(appendBooks(data.data.items));
        }

        setSearch('');
        setLoadingButton(false);
    };

    const sortCategoryHandler = async (name) => {
        const newBooks = books.filter((book) => {
            if (book.volumeInfo.categories) {
                return book.volumeInfo.categories[0].toLowerCase() === name;
            }
            return [];
        });
        console.log(newBooks);
        if (name === 'all') {
            const api = `https://www.googleapis.com/books/v1/volumes?q=${searchCash}&maxResults=${maxIdx}&startIndex=0&orderBy=${sortName}`;
            const data = await axios.get(api);
            setNumberResult(data.data.totalItems);
            return dispatch(addBooks(data.data.items));
        }
        return dispatch(addBooks(newBooks));
    };
    const sortSortsHandler = async (name) => {
        const api = `https://www.googleapis.com/books/v1/volumes?q=${searchCash}&maxResults=${maxIdx}&startIndex=0&orderBy=${name}`;
        const data = await axios.get(api);
        setNumberResult(data.data.totalItems);
        if (categoryName !== 'all') {
            dispatch(
                addBooks(
                    data.data.items.filter((book) => {
                        if (book.volumeInfo.categories) {
                            return (
                                book.volumeInfo.categories[0].toLowerCase() ===
                                categoryName
                            );
                        }
                        return [];
                    })
                )
            );
        } else {
            dispatch(addBooks(data.data.items));
        }
        // dispatch(addBooks(data.data.items));
    };

    return (
        <>
            <Header
                value={search}
                change={changeHandler}
                search={searchForm}
                keyPress={enterPressHandler}
                categories={categories}
                sorts={sorts}
                sortCategoryHandler={sortCategoryHandler}
                sortSortsHandler={sortSortsHandler}
            />
            <div className='container'>
                {loading ? (
                    <IsLoading />
                ) : (
                    <>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <Books
                                        result={numberResult}
                                        click={loadMoreHandler}
                                        loading={loading}
                                        loadingButton={loadingButton}
                                    />
                                }
                            />
                            <Route path='/:id' element={<Bookdetail />} />
                        </Routes>

                        {/* <button>Load more...</button> */}
                    </>
                )}
            </div>
        </>
    );
}

export default App;
