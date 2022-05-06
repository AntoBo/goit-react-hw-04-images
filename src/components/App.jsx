import { Component } from 'react';
import '../styles/styles.scss';
import Searchbar from './Searchbar/Searchbar';
import { getImagesApi } from '../utils/api.js';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Modal from './Modal/Modal';
import Err from './Err/Err.jsx';

export class App extends Component {
  state = {
    data: [],
    total: null,
    page: null,
    q: '',
    isLoading: false,
    isError: false,
    isModalOpen: false,
    error: null,
    modalItem: null,
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

  toggleModal = (modalItem = null) => {
    this.setState(prev => ({ isModalOpen: !prev.isModalOpen, modalItem }));
  };

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
        if (!data.hits.length && q) {
          throw new Error('no images found on search: ' + q);
        }
        this.setState(prev => ({
          data: [...prev.data, ...data.hits],
          total: data.totalHits,
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({ isError: true, error: err });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading, isError, error, total, isModalOpen, modalItem } =
      this.state;
    const showLoadMoreBtn = total > data.length && data.length > 0;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {isError && <Err message={error.message} />}
        {isLoading && <Loader />}
        {!isError && (
          <>
            {/* render if ok */}

            <ImageGallery openModal={this.toggleModal} items={data} />

            {showLoadMoreBtn && (
              <LoadMoreBtn handleClick={this.handleLoadMoreBtn} />
            )}

            {isModalOpen && (
              <Modal modalItem={modalItem} closeModal={this.toggleModal} />
            )}
          </>
        )}
      </>
    );
  }
}

export default App;
