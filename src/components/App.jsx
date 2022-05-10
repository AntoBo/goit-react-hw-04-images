/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/styles.scss';
import Searchbar from './Searchbar/Searchbar';
import { getImagesApi } from '../utils/api.js';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Err from './Err/Err.jsx';
import ModalProvider from 'context/ModalProvider';

const App = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = input => {
    setData([]);
    setQ(input);
    setPage(1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  //state.page&q settles here ¬
  const getImages = ({ q, page }) => {
    setIsLoading(true);
    setIsError(false);

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
    setPage(page => page + 1);
  };

  useEffect(() => {
    getImages({ q, page });
  }, [page, q]);

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
        <ModalProvider>
          <ImageGallery items={data} />

          {showLoadMoreBtn && <LoadMoreBtn handleClick={handleLoadMoreBtn} />}
        </ModalProvider>
      )}
    </>
  );
};

export default App;
