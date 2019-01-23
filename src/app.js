import React, { Component } from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      selectedComic: '',
      comicData: {} };
  }

  //block back button
  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  onSearchChange(string) {
    this.setState({ searchString: string });
  }

  onResultsChange(response) {
    this.setState({ detailScreen: false });
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
        <div className="thumbnailContainer">
          <ResultsList searchResults={this.state.searchResults} onComicClick={this.onComicClick} />
        </div>
    } else {
      mainScreen = <StatusMessage body={'No results'}/>
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">Marvel Comic Search</h1>
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