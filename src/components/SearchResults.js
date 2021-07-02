import React from "react";
import styles from "./SearchResults.module.css";
const SearchResults = (props) => {
  let defaultList = <p>No records found.</p>;

  const header = (
    <div className={styles.row + " " + styles.header + " " + styles.blue}>
      <div className={styles.cell}>Todo Item</div>
      <div className={styles.cell}>Completed</div>
      <div className={styles.cell}>Recurring</div>
      <div className={styles.cell}>Date Completed</div>
      <div className={styles.cell}>Tags</div>
    </div>
  );

  if (props.items.length > 0) {
    defaultList = props.items.map((list) => (
      <div className={styles.row} key={list.id}>
        <div className={styles.cell}>{list.name}</div>
        <div className={styles.cell}>{list.completed}</div>
        <div className={styles.cell}>{list.isrecurring}</div>
        <div className={styles.cell}>{list.datecompleted}</div>
        <div className={styles.cell}>
          {list.tags.map((item) => {
            return <div key={item.id}>{item.tagname}</div>;
          })}
        </div>
      </div>
    ));
  }
  return (
    <React.Fragment>
      {header}
      {defaultList}
    </React.Fragment>
  );
};
export default SearchResults;
