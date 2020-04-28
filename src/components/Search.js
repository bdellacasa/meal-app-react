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

  const handleOnKeyPress = (event) => {
    if (event.charCode == '13'){
        navigate(); // Enter pressed
    } else {
        setQuery(query.concat(event.key))
    }
  }

  return (
      (!redirectToResults ?
        <div className={"search-container"}>
            <form>
                <input
                    id={"search_form"}
                    className={"search-form"}
                    placeholder={"I want to make"}
                    onKeyPress={e => handleOnKeyPress(e)}
                />
            </form>
            <button className={"search-button"} onClick={() => navigate()}>Search</button>
        </div>
        :  <Redirect push to={`/search/${query}`} />
      )
  )
}

export default Search;
