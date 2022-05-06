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
    q: '',
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    //default load images on load
    if (!this.state.data.length) {
      this.getImages({ q: '', page: 1 });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //scroll to bottom after load more
    if (prevState.data.length) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onSubmit = () => {
    console.log('onSubmit in App');
  };

  handleLoadMoreBtn = () => {
    const { q, page } = this.state;
    this.getImages({ q: q, page: page + 1 });
  };

  //state.page&q settles here ¬
  getImages({ q, page }) {
    console.log('getting images...');
    this.setState({ isLoading: true, isError: false });
    getImagesApi({ q, page })
      .then(data => {
        this.setState(prev => ({
          data: [...prev.data, ...data.hits],
          total: data.totalHits,
          page,
          q,
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({ isError: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
        // window.scrollTo({
        //   top: document.body.scrollHeight,
        //   behavior: 'smooth',
        // });
      });
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
