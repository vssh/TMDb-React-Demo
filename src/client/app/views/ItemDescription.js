import React from 'react';
import style from './ItemDescription.css';

class ItemDescription extends React.Component{
    constructor() {
        super();
    }

    render() {
        var id, title, poster_path, year, overview, backdrop_path, vote_average;
        id = this.props.item.id;
        poster_path = this.props.item.poster_path;
        backdrop_path = this.props.item.backdrop_path;
        overview = this.props.item.overview;
        vote_average = this.props.item.vote_average;
        if(this.props.isTv) {
            title = this.props.item.name;
            year = new Date(this.props.item.first_air_date).getFullYear();
        }
        else {
            title = this.props.item.title;
            year = new Date(this.props.item.release_date).getFullYear();
        }



        let back = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
        let backStyle = {
            backgroundImage: `url(${back})`
        };

        let favClass;
        if(this.props.isFav) {
          favClass = 'fas fa-heart';
        }
        else {
          favClass = 'far fa-heart';
        }


        let rating = Math.round(vote_average);
        let stars = [];
        for(let i=0; i<10; i++){
          if(i+1 <= rating) {
            stars.push(<i key={i} className='fas fa-star' />);
          }
          else {
            stars.push(<i key={i} className='far fa-star' />);
          }
        }

        let rat = <div className='item-rating'>
                    {stars}
                  </div>

        return (<div className='item-background' style={backStyle} >
                    <div className='item-wrapper'>
                      <img className='item-poster' src={`https://image.tmdb.org/t/p/w92_and_h138_bestv2${poster_path}`} alt='poster' />
                      <div className='item-icons'>
                        <button className='item-fav' onClick={() => (this.props.onFav(this.props.item, this.props.isFav, this.props.isTv))}><i className={favClass}></i></button>
                        {rat}
                      </div>
                      <div className='item-name'>{title}<span>{` (${year})`}</span></div>
                      <p className='item-overview'>{overview}</p>
                    </div>
                    <button className='item-close' onClick={this.props.onClose}><i className='fas fa-times'></i></button>
                </div>)
    }
}

export default ItemDescription;
