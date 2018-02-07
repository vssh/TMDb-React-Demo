
const TV_LIST = "tvList";
const MOVIE_LIST = "movieList";
class Storage {
    constructor() {        
        this.tvList = this.jsonToMap(localStorage.getItem(TV_LIST));
        this.movieList = this.jsonToMap(localStorage.getItem(MOVIE_LIST));
    }
    
    addToFav(item, isTv) {
        if(isTv) {
            this.tvList.set(item.id, item);
            localStorage.setItem(TV_LIST, this.mapToJson(this.tvList));
        }
        else {
            this.movieList.set(item.id, item);
            localStorage.setItem(MOVIE_LIST, this.mapToJson(this.movieList));
        }
    }
    
    removeFromFav(item, isTv) {
        if(isTv) {
            this.tvList.delete(item.id);
            localStorage.setItem(TV_LIST, this.mapToJson(this.tvList));
        }
        else {
            this.movieList.delete(item.id);
            localStorage.setItem(MOVIE_LIST, this.mapToJson(this.movieList));
        }
    }
    
    isInFav(item, isTv) {
        if(isTv) {
            if(this.tvList.has(item.id))
                return true;
        }
        else {
            if(this.movieList.has(item.id))
                return true;
        }
        return false;
    }
    
    mapToJson(map) {
        return JSON.stringify([...map]);
    }
    
    jsonToMap(jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }
}

export default Storage;