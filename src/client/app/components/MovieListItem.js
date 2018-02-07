import React from "react";
import style from "./MovieListItem.css"

const MovieListItem = (props) => {
    var id, title, poster_path, year;
    id = props.item.id;
    poster_path = props.item.poster_path;
    if(props.isTv) {
        title = props.item.name;
        year = new Date(props.item.first_air_date).getFullYear();
    }
    else {
        title = props.item.title;
        year = new Date(props.item.release_date).getFullYear();
    }

    return (
        <div className='list-item-tile' onClick={() => {props.handleSelection(props.item, props.isTv);}} >
            <img className='list-item-tile-image' src={`https://image.tmdb.org/t/p/w92_and_h138_bestv2${poster_path}`} alt='poster' />
            <div className='list-item-tile-text'>
              <div className='list-item-tile-name'>{title}</div>
              <div className='list-item-tile-year'>{year}</div>
            </div>
        </div>
    )
}

export default MovieListItem;
