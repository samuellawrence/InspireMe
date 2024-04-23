const QUOTE_ENDPOINT_URL = `https://api.quotable.io`;

export const fetchRandomQuotes = () => {
    return fetch(url(`quotes/random?limit=25`))
        .then(response => response.json());
};

export const searchQuotes = (searchText, isAuthorSearch) => {
    let searchString = searchText;
    if (isAuthorSearch) {
        searchString = `author:${searchText}`;
    }
    let searchUrl = url(`search/quotes?limit=25&query=${searchString}&fuzzyMaxEdits=2`);
    return fetch(searchUrl)
        .then(response => response.json());
}

const url = (endpoint) => {
    return `${QUOTE_ENDPOINT_URL}/${endpoint}`;
}
