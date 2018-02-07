const ApiConfig = {
    KEY: "your_key_here",
    BASE_URL: "https://api.themoviedb.org/3"
};

export function fetchSearchMovies(keyWord, isTv) {
    let type = 'movie';
    if(isTv) type = 'tv';
    
    return fetch(`${ApiConfig.BASE_URL}/search/${type}?api_key=${ApiConfig.KEY}&query=${keyWord}`)
        .then(response => response.json())
}

export function fetchPopularMovies(isTv) {
    let type = 'movie';
    if(isTv) type = 'tv';
    
    return fetch(`${ApiConfig.BASE_URL}/discover/${type}?api_key=${ApiConfig.KEY}&sort_by=popularity.desc`)
        .then(response => response.json())
}

export function fetchMovie(id, isTv) {
    let type = 'movie';
    if(isTv) type = 'tv';
    
    return fetch(`${ApiConfig.BASE_URL}/${type}/${id}?api_key=${ApiConfig.KEY}&language=en-US`)
        .then(response => response.json())
}
