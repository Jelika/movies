import React from "react";
import styles from "./footer.module.css";
import github from "../../assets/github.png";

function Footer() {
  return (
    <footer className="footer">
      <a className={styles["footer-link"]} href="https://github.com/Jelika">
        <img
          className={styles["github-logo"]}
          src={github}
        ></img>
        <h5 className={styles["text-muted"]}>Jelika GitHub</h5>
      </a>
    </footer>
  );
}

export default Footer;
