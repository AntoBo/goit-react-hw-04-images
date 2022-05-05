import { Component } from 'react';

export class Searchbar extends Component {
  state = { input: '' };

  render() {
    return (
      <header className="Searchbar">
        <form className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
