import React,{useRef} from "react";
import styles from "./search.module.css";

const Search = ({setCurrentKeyWord,setIsNewSearchWord}) => {
  const inputEl = useRef(null);
 
  const onButtonClick = (event) => {
    setCurrentKeyWord( inputEl.current.value);
    setIsNewSearchWord(true);
    event.preventDefault();
  };

  return (
    <form onSubmit={(event)=>onButtonClick(event)} className="form-group" autoComplete="off">
    <div className={styles.form_row}>
      <input placeholder="Start typing..." ref={inputEl} autoFocus="" className="search-input form-control form-control-lg" type="text"
       id="input">
       </input>
       <a href="#" className={styles['close'], styles['d-none']}></a>
      <button id="submit-bottom" className="btn btn-info" type="submit" data-toggle="tooltip" data-html="true"
        data-placement="bottom" title="">
        Search
      </button>
      </div>
  </form>
  );
};

export default Search;
