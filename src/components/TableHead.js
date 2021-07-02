import reactDom from "react-dom";
import styles from "./TableHead.module.css";
import React from "react";
const TableHead = (props) => {
  let header;

  if (props.type === "1") {
    header = (
      <div className={styles.row + " " + styles.header + " " + styles.blue}>
        <div className={styles.cell}>Title</div>
        <div className={styles.cell}>Description</div>
        <div className={styles.cell}>Todo Items</div>
        <div className={styles.cell}>Edit</div>
        <div className={styles.cell}>Manage Todo Items</div>
        <div className={styles.cell}>Delete</div>
      </div>
    );
  } else if (props.type === "2") {
    header = (
      <div className={styles.row + " " + styles.header + " " + styles.blue}>
        <div className={styles.cell}>Item</div>
        <div className={styles.cell}>Completed</div>
        <div className={styles.cell}>Recurring</div>
        <div className={styles.cell}>Date Completed</div>
        <div className={styles.cell}>Tags</div>
        <div className={styles.cell}>Mark Complete</div>
        <div className={styles.cell}>Move</div>
        <div className={styles.cell}>Edit</div>
        <div className={styles.cell}>Delete</div>
      </div>
    );
  }

  return <React.Fragment>{header}</React.Fragment>;
};

export default TableHead;
