// import '/react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Rings } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader">
      <Rings height="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
