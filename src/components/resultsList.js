import React from 'react';
import { Button } from 'reactstrap';
import './resultsList.css';
import { searchComics, getComic } from '../api';

export default class ResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    handleClick(event) {
        getComic(event.currentTarget.dataset.id)
            .then((data) => {
                this.props.onComicClick({ data })
            });
    }

    handleNext() {
        const { searchString, resultsOffset, toggleLoading, onResultsChange} = this.props;
        const queryOffset = resultsOffset + 20;
        toggleLoading(true);
        searchComics(searchString, queryOffset)
            .then((response) => {
                onResultsChange(response);
                toggleLoading(false);;
            })
    }

    handlePrev() {
        const { searchString, resultsOffset, toggleLoading, onResultsChange } = this.props;
        const queryOffset = resultsOffset - 20;
        toggleLoading(true);
        searchComics(searchString, queryOffset)
            .then((response) => {
                onResultsChange(response);
                toggleLoading(false);;
            })
    }

    render() {
        const { searchResults, resultsOffset, resultsTotal } = this.props;
        const list = searchResults.map((comic) =>
            <div className='thumbnail' key={comic.id} data-id={comic.id} onClick={this.handleClick}>
                <img className='thumbnailImg' alt={comic.title} src={comic.thumbnail.path + '/portrait_uncanny.' + comic.thumbnail.extension} />
                <h2 className='truncated'>{comic.title}</h2>
            </div>
        );
        let next, prev

        if (resultsTotal > resultsOffset * 20) {
            next = <Button onClick={this.handleNext}>Next</Button>;
        }

        if (resultsOffset >= 20) {
            prev = <Button onClick={this.handlePrev} className='prevButton'>Previous</Button>;
        }

        return (
            <React.Fragment>
                <div className='thumbnailContainer'>
                    {list}
                </div>
                <div className='paginationContainer'>
                    {prev}
                    {next}
                </div>
            </React.Fragment>
        )
    }
}
