import { Component } from 'react';
import '../styles/styles.scss';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {};

  onSubmit() {
    console.log('onSubmit in App');
  }

  render() {
    return <Searchbar onSubmit={this.onSubmit} />;
  }
}

export default App;
