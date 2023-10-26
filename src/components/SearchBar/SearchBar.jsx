import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchBar = ({ handlerSubmit }) => {
  const [value, setValue] = useState('');
  const [lastRequest, setLastRequest] = useState('');

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return Notify.failure('Please, write something');
    } else if (value.toLowerCase().trim() === lastRequest) {
      return Notify.failure('This is current request');
    }
    handlerSubmit(value.toLowerCase().trim());
    setLastRequest(value.toLowerCase().trim());
    setValue('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={onSubmit}>
        <button type="submit" className="searchform-button">
          <span className="searchform-button-label">Search</span>
        </button>

        <input
          onChange={onChange}
          className="searchform-input"
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
SearchBar.propTypes = {
  handlerSubmit: PropTypes.func.isRequired,
};