import React, {Component} from 'react';
import Storage from './connectors/Storage';
import Popular from './views/Popular';
import Search from './views/Search';
import Fav from './views/Fav';
import TvToggle from './components/TvToggle';
import ItemDescription from './views/ItemDescription';
import style from './App.css';

const POPULAR_TAB = "popular";
const SEARCH_TAB = "search";
const FAV_TAB = "fav";

class App extends Component {
    constructor() {
        super();

        this.state = {
            selectedTab: SEARCH_TAB,
            movieSelected: {
                hasSelection : false
            },
            isTv: false
        };
        this.handleMovieSelection = this.handleMovieSelection.bind(this);
        this.handleFavToggle = this.handleFavToggle.bind(this);
        this.handleTvToggle = this.handleTvToggle.bind(this);
        this.closeItemDescription = this.closeItemDescription.bind(this);

        this.storage = new Storage();
    }

    handleMovieSelection(item, isTv) {
        this.setState({
            movieSelected : {
                hasSelection: true,
                isTv : isTv,
                isFav: this.storage.isInFav(item, isTv),
                description : item
            }
        });
    }

    handleFavToggle(item, wasFav, isTv) {
        if(wasFav) {
            this.storage.removeFromFav(item, isTv);
        }
        else {
            this.storage.addToFav(item, isTv);
        }

        this.setState(prevState => ({
            movieSelected : {
                hasSelection: true,
                isTv: prevState.movieSelected.isTv,
                isFav: this.storage.isInFav(prevState.movieSelected.description, prevState.movieSelected.isTv),
                description: prevState.movieSelected.description
            }
        }));
    }

    handleTvToggle(isTv) {
        this.setState({
            isTv: isTv
        });
    }

    closeItemDescription() {
        this.setState({
            movieSelected : {
                hasSelection: false
            }
        });
    }

    render() {
        let descriptionView = null;
        let tabDisplayClass = ""; 
        if(this.state.movieSelected.hasSelection) {
            descriptionView = <ItemDescription
                    isTv={this.state.movieSelected.isTv}
                    item={this.state.movieSelected.description}
                    isFav={this.state.movieSelected.isFav}
                    onClose={this.closeItemDescription}
                    onFav={this.handleFavToggle} />
                    
            tabDisplayClass = "displayNone";
        }
        //else {
            let tab;
            let searchTabClass = 'app-tab';
            let favTabClass = 'app-tab';
            let popularTabClass = 'app-tab';
            if(this.state.selectedTab === POPULAR_TAB) {
                popularTabClass += ' app-tab-selected';

                tab = <Popular
                        isTv={this.state.isTv}
                        handleMovieSelection={this.handleMovieSelection} />
            }
            else if(this.state.selectedTab === FAV_TAB) {
              favTabClass += ' app-tab-selected';

                tab = <Fav
                        isTv={this.state.isTv}
                        handleMovieSelection={this.handleMovieSelection}
                        storage={this.storage} />
            }
            else {
                searchTabClass += ' app-tab-selected';

                tab = <Search
                        isTv={this.state.isTv}
                        handleMovieSelection={this.handleMovieSelection} />
            }

            return (<div className='app-content'>
                        <div className='app-main'>
                        <div className='app-tv-toggle'>
                          <TvToggle
                              toggleVal={this.state.isTv}
                              onToggle={this.handleTvToggle} />
                        </div>

                        <div className='app-tab-row'>
                            <button className={searchTabClass}
                                onClick={() => (this.setState({selectedTab: SEARCH_TAB}))}>Search</button>
                            <button className={favTabClass}
                                onClick={() => (this.setState({selectedTab: FAV_TAB}))}>Favorites</button>
                            <button className={popularTabClass}
                                onClick={() => (this.setState({selectedTab: POPULAR_TAB}))}>Popular</button>
                        </div>

                        <div className={`app-tab-content ${tabDisplayClass}`}>
                          {tab}
                        </div>
                        
                        </div>
                        
                        <div className='footer'>
                            <div className='github-container'>
                                <i className='fab fa-github'></i><a href='https://github.com/vssh/TMDb-React-Demo'>Source</a>
                            </div>
                            <div className='tmdb-container'>
                                <span>Powered by</span>
                                <img src='https://www.themoviedb.org/static_cache/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg'></img>
                            </div>
                        </div>
                        
                        {descriptionView}

                   </div>)
        //}
    }
}

export default App;
