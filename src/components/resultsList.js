import React from 'react';
import './resultsList.css';
import { getComic } from '../api';

export default class ResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        getComic(event.currentTarget.dataset.id)
            .then((data) => {
                this.props.onComicClick({ data })
            });
    }

    render() {
        const { searchResults } = this.props;
        const list = searchResults.map((comic) =>
            <div className='thumbnail' key={comic.id} data-id={comic.id} onClick={this.handleClick}>
                <img className='thumbnailImg' alt={comic.title} src={comic.thumbnail.path + '/portrait_uncanny.' + comic.thumbnail.extension} />
                <h2 className='truncated'>{comic.title}</h2>
            </div>
        );

        return (
            (list)
        )
    }
}
