import React from 'react';
import MovieListItem from './MovieListItem';

class MovieList extends React.Component {
    constructor() {
        super();
    }
    
    
    
    render() {
        return (
            <div >
                {this.props.list ?
                this.props.list
                .map((item, index) => 
                    <MovieListItem 
                        isTv={this.props.isTv}
                        item={item}
                        key={item.id}
                        handleSelection={this.props.handleSelection} />) : ""}
            </div>
        )
    }
}

export default MovieList;
