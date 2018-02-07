import React, {Component} from 'react';
import MovieList from '../components/MovieList';
import {fetchPopularMovies} from '../connectors/Api';

class Popular extends Component {
    constructor() {
        super();

        this.state = {
            tvList: [],
            movieList: []
        };
    }

    componentWillMount() {
        if((this.props.isTv && this.state.tvList.length === 0) ||
            (!this.props.isTv && this.state.movieList.length === 0)) {
                this.getMovieList(this.props.isTv);
        }
    }

    componentWillReceiveProps(nextProps) {
        if((nextProps.isTv && this.state.tvList.length === 0) ||
            (!nextProps.isTv && this.state.movieList.length === 0)) {
                this.getMovieList(nextProps.isTv);
        }
    }

    getMovieList(isTv) {
        fetchPopularMovies(isTv)
        .then(list => {
                console.log(list);
                if(isTv) {
                    this.setState({
                        tvList : list.results
                    });
                }
                else {
                    this.setState({
                        movieList : list.results
                    });
                }
            });
    }

    render() {
        let list = [];
        if(this.props.isTv) {
            list = this.state.tvList;
        }
        else {
            list = this.state.movieList;
        }
        return <MovieList
                    isTv={this.props.isTv}
                    list={list}
                    handleSelection={this.props.handleMovieSelection}/>
    }
}

export default Popular;
