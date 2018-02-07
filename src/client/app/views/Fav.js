import React, {Component} from 'react';
import Storage from '../connectors/Storage';
import MovieList from '../components/MovieList';

class Fav extends Component {
    constructor() {
        super();

        this.state = {
            list : []
        };
    }

    componentWillMount() {
        var this_ = this;
        this.isLocalTv = this.props.isTv;
        new Promise(function(resolve, reject) {
            if(this_.props.isTv) {
                resolve(this_.props.storage.tvList);
            }
            else {
                resolve(this_.props.storage.movieList);
            }
        })
        .then((map) => {
                var lst = [];
                for (var [key, value] of map) {
                  lst.push(value);
                }
                return lst;

        })
        .then((list) => (this_.setState({
            list : list
        })));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isTv !== this.props.isTv) {
            var this_ = this;
            new Promise(function(resolve, reject) {
                if(nextProps.isTv) {
                    resolve(this_.props.storage.tvList);
                }
                else {
                    resolve(this_.props.storage.movieList);
                }
            })
            .then((map) => {
                    var lst = [];
                    for (var [key, value] of map) {
                      lst.push(value);
                    }
                    return lst;

            })
            .then((list) => (this_.setState({
                list : list
            })));
        }
    }

    render() {
        return <MovieList
                isTv={this.props.isTv}
                list={this.state.list}
                handleSelection={this.props.handleMovieSelection}/>
    }
}

export default Fav;
