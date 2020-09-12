import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/search.styles.scss'

const Search = () => {
  const [query, setQuery] = useState('');
  const [redirectToResults, setRedirectToResults] = useState(false);

  const navigate = () => {
    if (query.length > 0) {
      setRedirectToResults(true);
    }
  }

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      navigate(); // Enter pressed
    }
  }

  const handleOnChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    (!redirectToResults ?
      <div className={"search-container"}>
        <form>
          <input
            id={"search_form"}
            className={"search-form"}
            placeholder={"I want to make"}
            onKeyDown={e => handleOnKeyDown(e)}
            onChange={handleOnChange}
          />
        </form>
        <button className={"search-button"} onClick={() => navigate()}>Search</button>
      </div>
      : <Redirect push to={`/search/${query}`} />
    )
  )
}

export default Search;
