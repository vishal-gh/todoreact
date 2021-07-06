import React, { useState, useEffect, useRef } from "react";
import styles from "./TodoItemForm.module.css";
import axios from "axios";

const TodoItemForm = (props) => {
  const postLink =
    "http://localhost:4000/api/v1/todo_lists/" +
    props.todolistid +
    "/todo_items";

  const nameInputRef = useRef();
  const tagsInputRef = useRef();
  const recurringInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredTags = tagsInputRef.current.value;
    const checked = recurringInputRef.current.checked;
    const todo_item = {
      name: enteredName,
      tagname: enteredTags,
      isrecurring: checked,
    };
    axios
      .post(postLink, todo_item)
      .then((response) => {
        props.onAddTodoItem(response.data.message);
      })
      .catch((error) => {
        let topMsg;
        topMsg = "Item could not be saved";
        props.onAddTodoItem(topMsg);
      });

    nameInputRef.current.value = "";
    tagsInputRef.current.value = "";
    recurringInputRef.current.checked = false;
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.tablecell}>
            <label>Name</label>
          </div>
          <div className={styles.tablecell}>
            <input
              type="text"
              style={{ width: 200 }}
              ref={nameInputRef}
            ></input>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.tablecell}>
            <label>Tags</label>
          </div>
          <div className={styles.tablecell}>
            <input
              type="text"
              style={{ width: 200 }}
              name="tagname"
              id="tagname"
              data-role="tagsinput"
              ref={tagsInputRef}
            ></input>
          </div>
          <div className={styles.row}>
            <div className={styles.tablecell}></div>
            <div className={styles.tablecell}>
              <input type="checkbox" ref={recurringInputRef}></input>
              <label>Is Recurring</label>
            </div>
          </div>
        </div>
        <div>
          <button type="submit">Add Item</button>
        </div>
      </div>
    </form>
  );
};

export default TodoItemForm;
