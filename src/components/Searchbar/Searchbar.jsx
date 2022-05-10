import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="button-label"></span>
        </button>
        <input
          onChange={e => setInput(e.target.value)}
          className="SearchForm-input"
          type="text"
          autoFocus
          placeholder="Lets search!"
        />
      </form>
    </header>
  );
};

export default Searchbar;
