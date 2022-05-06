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
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onSubmit = input => {
    this.setState({ data: [] });
    this.getImages({ q: input, page: 1 });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  handleLoadMoreBtn = () => {
    const { q, page } = this.state;
    this.getImages({ q: q, page: page + 1 });
  };

  //state.page&q settles here ¬
  getImages({ q, page }) {
    this.setState({ isLoading: true, isError: false, page, q });

    getImagesApi({ q, page })
      .then(data => {
        this.setState(prev => ({
          data: [...prev.data, ...data.hits],
          total: data.totalHits,
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({ isError: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading, isError, total } = this.state;
    const showLoadMoreBtn = total > data.length;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {isError && <p>Error!</p>}
        {isLoading && <Loader />}
        {!isError && (
          <>
            {/* render if ok */}

            <ImageGallery items={data} />
            {showLoadMoreBtn && (
              <LoadMoreBtn handleClick={this.handleLoadMoreBtn} />
            )}
          </>
        )}
      </>
    );
  }
}

export default App;
