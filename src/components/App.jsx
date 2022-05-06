import { Component } from 'react';
import '../styles/styles.scss';
import Searchbar from './Searchbar/Searchbar';
import { getImagesApi } from '../utils/api.js';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';

export class App extends Component {
  state = {
    data: [],
    total: null,
    page: null,
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    //default load images on load
    if (!this.state.data.length) {
      this.getImages({ q: '', page: 1 });
    }
  }

  onSubmit() {
    console.log('onSubmit in App');
  }

  handleLoadMoreBtn() {
    console.log('handleLoadMoreBtn fired');
  }

  getImages({ q, page }) {
    console.log('getting images...');
    this.setState({ isLoading: true, isError: false });
    getImagesApi({ q, page })
      .then(data => {
        this.setState(prev => ({
          data: [...prev.data, ...data.hits],
          total: data.totalHits,
          page: page,
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({ isError: true });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { data, isLoading, isError, hasData } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {isError && <p>Error!</p>}
        {isLoading && <Loader />}
        {/* render if ok */}
        {!isError && (
          <>
            <ImageGallery items={data} />
            <LoadMoreBtn handleClick={this.handleLoadMoreBtn} />
          </>
        )}
      </>
    );
  }
}

export default App;
