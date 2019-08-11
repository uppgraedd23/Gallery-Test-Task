const initialState = {
    loading: true,
    error: '',
    imagesList: [],
    page: 1,
    count: 2,

}

const galleryReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                imagesList: [...state.imagesList, ...action.payload],
                error: '',
                msg: ''
            }
        case 'PAGE_CHANGE':
            return {
                ...state,
                loading: true,
                page: action.payload,
                msg: ''
            }

        case 'COUNT_CHANGE':
            return {
                ...state,
                loading: true,
                count: action.payload,
                page: 1,
                imagesList: [],
                msg: ''
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                thumbnail: [],
                error: 'Smthng went wrong',
                msg: ''
            }
        case 'FETCH_LOAD_ALL_ITEMS':
            return {
                ...state,
                loading: false,
                error: '',
                msg: 'All Data Is Load'
            }

        default:
            return state
    }
}

export default galleryReducer;