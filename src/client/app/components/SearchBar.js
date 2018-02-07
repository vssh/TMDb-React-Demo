import React from 'react';
import _ from 'lodash';
import style from './SearchBar.css';

class SearchBar extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        var onChange = this.props.onKeyWordChange;
        this.search = _.debounce((term) => { onChange(term) }, 500);
    }

    handleChange(e) {
        this.search(e.target.value);
    }

    render() {
        return (
            <div className='search-bar-container'>
                <i className='fas fa-search'/>
                <input className='search-bar-input' type='search' val={this.props.keyword} onInput={this.handleChange} />
            </div>
        )
    }
}

export default SearchBar;
