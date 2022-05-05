import { Component } from 'react';
import '../styles/styles.scss';
import Searchbar from './Searchbar/Searchbar';
import { getImagesApi } from '../utils/api.js';
import ImageGallery from './ImageGallery/ImageGallery';

// console.log(getImagesApi);
getImagesApi('cat', 1);

export class App extends Component {
  state = {};

  onSubmit() {
    console.log('onSubmit in App');
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery />
      </>
    );
  }
}

export default App;
