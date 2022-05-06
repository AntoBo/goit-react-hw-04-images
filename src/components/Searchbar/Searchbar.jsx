import { Component } from 'react';

export class Searchbar extends Component {
  state = { input: '' };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.onSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="button-label"></span>
          </button>
          <input
            onChange={e => this.setState({ input: e.target.value })}
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
