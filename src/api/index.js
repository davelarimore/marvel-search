const API_BASE_URL = 'https://gateway.marvel.com/v1/public';
const apikey = 'eb320035e18eff1c089e949942b6a684';

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const searchComics = (searchString) => {
    return fetch(`${API_BASE_URL}/comics?titleStartsWith=${searchString}&apikey=${apikey}`, {
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
