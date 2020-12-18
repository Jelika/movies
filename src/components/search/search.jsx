import React, { useRef, useState } from "react";
import styles from "./search.module.css";

const Search = ({ setCurrentKeyWord}) => {
  const inputEl = useRef(null);
  const [closeBtnIsVisible, setCloseBtnIsVisible] = useState(false);

  const onButtonClick = (event) => {
    setCurrentKeyWord(inputEl.current.value);
    event.preventDefault();
  };

  const onChange = () => {
    inputEl.current.value
      ? setCloseBtnIsVisible(true)
      : setCloseBtnIsVisible(false);
  };

  const onCloseClick = (event) => {
    inputEl.current.value = "";
    setCloseBtnIsVisible(false);
  };

  return (
    <form
      onSubmit={(event) => onButtonClick(event)}
      className="form-group"
      autoComplete="off"
    >
      <div className={styles.form_row}>
        <input
          placeholder="Start typing..."
          ref={inputEl}
          onChange={() => onChange()}
          autoFocus=""
          className="search-input form-control form-control-lg"
          type="text"
          id="input"
        ></input>
        <div
          onClick={(event) => onCloseClick(event)}
          className={`${styles.close} ${
            closeBtnIsVisible ? "" : styles.d_none
          }`}
        ></div>
        <button
          id="submit-bottom"
          className="btn btn-info"
          type="submit"
          data-toggle="tooltip"
          data-html="true"
          data-placement="bottom"
          title=""
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
