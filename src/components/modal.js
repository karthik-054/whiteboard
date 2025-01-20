import React from "react";
import styles from "./white.module.css";
import { GoIssueClosed } from "react-icons/go";

const Model = ({ close }) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.modalbody}>
          <div className={styles.modaltitle}>
            <h1>
              WELCOME TO YOUR <span className={styles.span}> CANVA</span> BOARD
            </h1>
          </div>
          <div className={styles.section}>
            <h3>
              You Can Draw Your Own Ideas....
              <br /> You Can Applied So Many Colors This Board<br />
              <br />{" "}
              <span className={styles.enjoy}>
                Enjoy!!
              </span>
            </h3>
          </div>
          <br />
          <br />
          <br />
          <div className={styles.footer}>
            <button className={styles.btn} onClick={close}>
              Close <GoIssueClosed color="green" size={27} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Model;
 