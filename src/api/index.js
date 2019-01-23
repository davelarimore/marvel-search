const API_BASE_URL = 'https://gateway.marvel.com/v1/public';
const apikey = 'eb320035e18eff1c089e949942b6a684';

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const searchComics = (searchString, offset) => {
    //get some results even if no string is provided
    let query = `hasDigitalIssue=true&apikey=${apikey}`;
    if (searchString && offset) {
        query = `titleStartsWith=${searchString}&offset=${offset}&apikey=${apikey}`;
    } else if (searchString) {
        query = `titleStartsWith=${searchString}&apikey=${apikey}`
    } else if (offset) {
        query = `hasDigitalIssue=true&offset=${offset}&apikey=${apikey}`;
    }
    return fetch(`${API_BASE_URL}/comics?${query}`, {
    })
        .then(handleErrors)
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const getComic = (comicId) => {
    return fetch(`${API_BASE_URL}/comics/${comicId}?apikey=${apikey}`, {
    })
        .then(handleErrors)
        .then(res => res.json())
        .catch(error => console.log(error));
}