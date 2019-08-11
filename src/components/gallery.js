import React, {useEffect, useReducer, useState, useCallback} from 'react';
import axios from 'axios'
import Preloader from "./preloader";
import { useSelector, useDispatch } from 'react-redux';

import s from './galery.module.css';

// change react-redux on own redux


//display columns
//add typescript
//load 15 items by default
//mane buttton load more
//style


function Gallery() {
    const galleryState = useSelector(state => state.gallery);
    const dispatch = useDispatch();
    // const [state, dispatch] = useReducer(reducer, initialState);
    // const [images, setImages] = useState([{thumbnail: "https://beatmaker.tv/activecontent/images/users/5567/beatmaker-small.jpg"}, {thumbnail: "https://beatmaker.tv/activecontent/images/users/5567/beatmaker-small.jpg"}, {thumbnail: "https://beatmaker.tv/activecontent/images/users/5567/beatmaker-small.jpg"}]);

    useEffect(() => {
        if (galleryState.count){
            axios
                .get(`https://repetitora.net/api/JS/Images?page=${galleryState.page}&count=${galleryState.count}`)
                .then(response => {
                    if (response.data.length) {
                        dispatch({type: 'FETCH_SUCCESS', payload: response.data});
                    } else {
                        dispatch({type: 'FETCH_LOAD_ALL_ITEMS'})
                    }
                })
                .catch(error => {
                    dispatch({type: 'FETCH_ERROR'})
                })
        }
    }, [galleryState.page, galleryState.count]);


    const loadMore = useCallback((currentPage) => {
        dispatch({type: 'PAGE_CHANGE', payload: currentPage + 1});
    }, [])

    const changeColumns = useCallback((count) => {
        dispatch({type: 'COUNT_CHANGE', payload: count});
    }, [])

    return (
        <div>
            <div>
                columns :<input value={galleryState.count} onChange={(e) => changeColumns(e.target.value)} type="number"/>
            </div>
            {galleryState.loading
                ? <Preloader/>
                : <ul className={s.list}>{galleryState.imagesList.map((item, index) => (<li style={{flex:'0 0 ' + 100 / (+galleryState.count) + '%'}} className={s.list_item}><img key={index} src={item.thumbnail}/></li>) )}</ul> }
            {galleryState.error && galleryState.error}
            {galleryState.msg && galleryState.msg}
            <div><button onClick={()=> loadMore(+galleryState.page)}>Load More</button></div>
        </div>
    )
}

export default Gallery