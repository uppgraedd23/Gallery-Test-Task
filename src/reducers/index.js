import createStore from "redux/src/createStore";
import combineReducers from "redux/src/combineReducers";

import {applyMiddleware} from "redux";
import thunkMiddleware  from "redux-thunk"
import galleryReducer from "./galleryReducer";


let reducers = combineReducers({
    gallery: galleryReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;