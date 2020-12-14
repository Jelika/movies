import React, { useState, useRef } from "react";
import styles from "./dropdown.module.css";

const Dropdown = () => {
  const currentYear = useRef("");
  const [currentYearNumber, setCurrentYearNumber] = useState("");

  const dropdownYears = range(1960, 2020);
  const options = dropdownYears.map((number, i) => (
    <option key={number}>{number}</option>
  ));

  function range(start, end) {
    if (start === end) return [start];
    return [start, ...range(start + 1, end)];
  }

  function yearCategory() {
    setCurrentYearNumber(currentYear.current.value);
  }

  return (
    <div className ={styles.yearContainer}><div className={styles.yearText}>Choose year: </div>  
      <div className={styles["select-wrapper"]}>
        <div>
      <select
        onClick={() => yearCategory()}
        ref={currentYear}
        className={styles.selectElementId}
      >
        <option key="0"></option>
        {options}
      </select>
      </div>
    </div>
    </div>
  );
};

export default Dropdown;
