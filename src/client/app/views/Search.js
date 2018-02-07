import React, {Component} from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import {fetchSearchMovies} from '../connectors/Api';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchKeyword: "",
            movieList: [],
            tvList: []
        };
        this.onSearchKeywordChange = this.onSearchKeywordChange.bind(this);
    }

    componentWillMount() {
        this.lastIsTv = this.props.isTv;
    }
    
    componentDidUpdate() {
        if(this.props.isTv !== this.lastIsTv) {
            this.onSearchKeywordChange(this.state.searchKeyword);
            this.lastIsTv = this.props.isTv;
        }
    }

    onSearchKeywordChange(keyword) {
        this.setState({
            searchKeyword: keyword
        });

        if(keyword != null && keyword !== "") {
            const this_ = this;
            fetchSearchMovies(keyword, this_.props.isTv)
            .then(list => {
                if(this_.state.searchKeyword != null && this_.state.keyword !== "") {
                    if(this_.props.isTv) {
                        this_.setState({
                            tvList : list.results.splice(0, 10),
                            movieList: []
                        });
                    }
                    else {
                        this_.setState({
                            movieList : list.results.splice(0, 10),
                            tvList: []
                        });
                    }
                }
                else {
                    this_.setState({
                        movieList : [],
                        tvList: []
                    });
                }
            });
        }
        else {
            this.setState({
                movieList : [],
                tvList: []
            });
        }
    }

    render() {
        let listToShow;
        if(this.props.isTv) {
            listToShow = this.state.tvList;
        }
        else {
            listToShow = this.state.movieList;
        }
    
        return (<div>
                <SearchBar
                    keyword={this.state.searchKeyword}
                    onKeyWordChange={this.onSearchKeywordChange} />

                <MovieList
                    isTv={this.props.isTv}
                    list={listToShow}
                    handleSelection={this.props.handleMovieSelection}/>
            </div>);
    }
}

export default Search;
