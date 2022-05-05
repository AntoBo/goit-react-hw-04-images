import { Component } from 'react';

export class Searchbar extends Component {
  state = { input: '' };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="button-label"></span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoFocus
            placeholder="Lets search!"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
