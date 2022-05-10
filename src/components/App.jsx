import { useState, useEffect } from 'react';
import '../styles/styles.scss';
import Searchbar from './Searchbar/Searchbar';
import { getImagesApi } from '../utils/api.js';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Modal from './Modal/Modal';
import Err from './Err/Err.jsx';

const App = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  const onSubmit = input => {
    setData([]);
    getImages({ q: input, page: 1 });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  //state.page&q settles here ¬
  const getImages = ({ q, page }) => {
    setQ(q);
    setPage(page);
    setIsLoading(true);
    setIsError(false);
    setQ(q);

    getImagesApi({ q, page })
      .then(data => {
        if (!data.hits.length && q) {
          throw new Error('no images found on search: ' + q);
        }

        setData(prev => [...prev, ...data.hits]);
        setTotal(data.totalHits);
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoadMoreBtn = () => {
    getImages({ q, page: page + 1 });
  };

  const toggleModal = (modalItem = null) => {
    setIsModalOpen(prev => !prev);
    setModalItem(modalItem);
  };

  //default load images on load
  useEffect(() => {
    if (!data.length) {
      // setQ('');
      // setPage(1);
      getImages({ q, page });
    }
  }, []);

  //scroll to bottom after load more
  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  });

  const showLoadMoreBtn = total > data.length && data.length > 0;

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {isError && <Err message={error.message} />}
      {isLoading && <Loader />}
      {!isError && (
        <>
          {/* render if ok */}

          <ImageGallery openModal={toggleModal} items={data} />

          {showLoadMoreBtn && <LoadMoreBtn handleClick={handleLoadMoreBtn} />}

          {isModalOpen && (
            <Modal modalItem={modalItem} closeModal={toggleModal} />
          )}
        </>
      )}
    </>
  );
};

export default App;
