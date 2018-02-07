import React from 'react';
import style from './TvToggle.css';

 const TvToggle = (props) => {
    var label;
    if(props.toggleVal) {
      label = (<label htmlFor="tv-toggle-checkbox"><i className='fas fa-tv' /><span>TV</span></label>)
    }
    else {
      label = (<label htmlFor="tv-toggle-checkbox"><i className='fas fa-film' /><span>Movies</span></label>)
    }

     return (
         <div>
            <input type="checkbox"
                id="tv-toggle-checkbox"
                checked={props.toggleVal}
                onChange={e => {props.onToggle(e.target.checked);}} />
              {label}
         </div>
    )
}

export default TvToggle;
