//actions types
const ADD_BOOKS = 'ADD_BOOKS';
const APPEND_BOOKS = 'APPEND_BOOKS';
const SORT_CATEGORY = 'SORT_CATEGORY';
const SORT_SORTS = 'SORT_SORTS';

const initialState = {
    books: [],
    totalResults: 0,
    sortNameCategory: 'all',
    sorts: 'relevance',
};

export function booksReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BOOKS:
            return { ...state, books: action.payload };
        case APPEND_BOOKS:
            return { ...state, books: state.books.concat(action.payload) };
        case SORT_CATEGORY:
            return { ...state, sortNameCategory: action.payload };
        case SORT_SORTS:
            return { ...state, sorts: action.payload };
        // case SORT_CATEGORY
        // case SORT_CATEGORY
        default:
            return state;
    }
}

//actions

export const addBooks = (books) => ({ type: ADD_BOOKS, payload: books });
export const appendBooks = (books) => ({ type: APPEND_BOOKS, payload: books });
export const sortCategory = (category) => ({
    type: SORT_CATEGORY,
    payload: category,
});
export const sortSorts = (sorts) => ({
    type: SORT_SORTS,
    payload: sorts,
});
