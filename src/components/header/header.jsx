import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className="App-header">
      <h1 className={styles["navbar-brand"]}>MovieSearch</h1>
    </header>
  );
};

export default Header;
