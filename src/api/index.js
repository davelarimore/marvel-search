const API_BASE_URL = 'https://gateway.marvel.com/v1/public';
const apikey = 'eb320035e18eff1c089e949942b6a684';

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const searchComics = (searchString) => {
    //get some results even if no string is provided
    let query = `hasDigitalIssue=true&`;
    if (searchString) {
        query = `titleStartsWith=${searchString}&`
        console.log(query);
    } else {
    }
    return fetch(`${API_BASE_URL}/comics?${query}apikey=${apikey}`, {
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