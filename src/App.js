import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Bookdetail from './pages/Bookdetail/Bookdetail';
import Books from './pages/Books/Books';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addBooks, appendBooks } from './store/reducers/booksReducer';
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

    const categories = [
        'all',
        'atr',
        'biography',
        'computers',
        'history',
        'medical',
        'poetry',
    ];
    const sorts = ['relevalce', 'newest'];

    const changeHandler = (e) => {
        setSearch(e.target.value);
        setSearchCash(e.target.value);
    };

    const searchForm = async () => {
        try {
            setLoading(true);
            const api = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=${maxIdx}&startIndex=${startIdx}`;
            const data = await axios.get(api);
            setNumberResult(data.data.totalItems);
            dispatch(addBooks(data.data.items));
            setSearch('');
            setStartIdx((state) => (state += maxIdx));
            setLoading(false);
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
        const api = `https://www.googleapis.com/books/v1/volumes?q=${searchCash}&maxResults=${maxIdx}&startIndex=${startIdx}`;
        const data = await axios.get(api);
        setNumberResult(data.data.totalItems);
        dispatch(appendBooks(data.data.items));
        setSearch('');
        // setLoadingButton(false);
    };
    const chooseCategory = (name) => {
        console.log(name);
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
                chooseCategory={chooseCategory}
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
