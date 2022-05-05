import { Component } from 'react';
import '../styles/styles.scss';
import Searchbar from './Searchbar/Searchbar';
import { getImagesApi } from '../utils/api.js';
import ImageGallery from './ImageGallery/ImageGallery';

// console.log(getImagesApi('cat', 1));
getImagesApi('cat', 1);

export class App extends Component {
  status = {
    START: 'start',
    LOADING: 'loading',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  };
  state = {
    data: [],
    total: null,
    status: this.status.START,
  };

  componentDidMount() {
    this.getImages();
  }

  onSubmit() {
    console.log('onSubmit in App');
  }

  getImages() {
    this.setState({ status: this.status.LOADING });
    getImagesApi({ q: 'cat', page: 2 })
      .then(data => {
        // console.log(data);
        this.setState({ data: data.hits, total: data.totalHits });
        this.setState({ status: this.status.RESOLVED });
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: this.status.REJECTED });
      });
  }
  // this.getImages();

  render() {
    const { data, status } = this.state;
    switch (status) {
      case this.status.RESOLVED:
        return (
          <>
            <Searchbar onSubmit={this.onSubmit} />
            <ImageGallery items={data} />
          </>
        );
    }
  }
}

export default App;
