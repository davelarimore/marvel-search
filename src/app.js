import React, { Component } from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { searchComics } from './api';
import SearchForm from './components/searchForm';
import ResultsList from './components/resultsList';
import ComicDetail from './components/comicDetail';
import StatusMessage from './components/statusMessage';
import Loading from './components/loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onResultsChange = this.onResultsChange.bind(this);
    this.onComicClick = this.onComicClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.state = {
      loading: false,
      detailScreen: false,
      searchString: '',
      searchResults: [],
      resultsOffset: 0,
      resultsTotal: 0,
      selectedComic: '',
      comicData: {} };
  }

  //pre-load some comics
  componentWillMount() {
      this.toggleLoading(true);
      searchComics('')
        .then((response) => {
          this.onResultsChange(response);
          this.toggleLoading(false);;
        })

  }

  //block back button
  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  //pin screens to top
  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  onSearchChange(string) {
    this.setState({ searchString: string });
  }

  onResultsChange(response) {
    this.setState({ detailScreen: false });
    this.setState({ resultsOffset: 0 });
    this.setState({ resultsTotal: response.data.total });
    this.setState({ resultsOffset: response.data.offset });
    this.setState({ searchResults: response.data.results });
  }

  onComicClick(response) {
    this.setState({ selectedComic: response.data.data.results[0].id });
    this.setState({ comicData: response.data.data.results[0] });
    this.setState({ detailScreen: true });
  }

  onBack(boolean) {
    this.setState({ detailScreen: boolean });
  }

  toggleLoading(boolean) {
    this.setState({ loading: boolean });
  }

  render() {
    const isLoading = this.state.loading;
    const isDetailView = this.state.detailScreen;
    const resultsFound = this.state.searchResults.length > 0;
    let loadingModal, mainScreen;

    if (isLoading) {
      loadingModal = <Loading />
    }

    if (isDetailView) {
      mainScreen = <ComicDetail selectedComic={this.state.selectedComic} comicData={this.state.comicData} onBack={this.onBack}/>
    } else if (resultsFound) {
      mainScreen =
          <ResultsList
          searchString={this.state.searchString}
          searchResults={this.state.searchResults}
          resultsOffset={this.state.resultsOffset}
          resultsTotal={this.state.resultsTotal}
          onResultsChange={this.onResultsChange}
          onComicClick={this.onComicClick}
          toggleLoading={this.toggleLoading}
        />
    } else {
      mainScreen = <StatusMessage body={'No results. Please try another search term.'}/>
    }

    return (
      <div className='app'>
        <header className='appHeader'>
          <h1 className='title'>Marvel Comic Search</h1>
          <p className='preamble'>Search for comics by name via the Marvel API</p>
          <SearchForm
            searchString={this.state.searchString}
            onSearchChange={this.onSearchChange}
            onResultsChange={this.onResultsChange}
            toggleLoading={this.toggleLoading}
          />
        </header>
        <main>
          {loadingModal}
          {mainScreen}
        </main>
      </div>
    );
  }
}

export default App;