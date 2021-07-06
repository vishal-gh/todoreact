import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./TodoForm.module.css";

const TodoForm = (props) => {
  const postLink = "http://localhost:4000/api/v1/todo_lists";
  const titleInputRef = useRef();
  const descInputRef = useRef();
  const [errorTitle, setTitleError] = useState(false);
  const [errorDesc, setDescError] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const enteredTitle = titleInputRef.current.value;
      const enteredDescription = descInputRef.current.value;
      if (enteredTitle.length === 0 && enteredDescription.length === 0) {
        setTitleError(true);
        setDescError(true);
        throw new Error("Name and description are required");
      } else if (enteredTitle.length === 0) {
        setTitleError(true);
        throw new Error("Name is required");
      } else if (enteredDescription.length === 0) {
        setDescError(true);
        throw new Error("Description is required");
      }
      const todo_list = {
        title: enteredTitle,
        description: enteredDescription,
      };
      const response = await axios.post(postLink, todo_list);
      if (!response.statusText === "OK") {
        throw new Error("An error has occured");
      } else {
        props.onAddTodo(response.data.message, false);
        titleInputRef.current.value = "";
        descInputRef.current.value = "";
      }
    } catch (error) {
      props.onAddTodo(error.message, true);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.tablecell}>
            <label>Title</label>
          </div>
          <div className={styles.tablecell}>
            <input
              type="text"
              style={{ width: 400 }}
              className={errorTitle ? styles.error : ""}
              ref={titleInputRef}
            ></input>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.tablecell}>
            <label>Description</label>
          </div>
          <div className={styles.tablecell}>
            <textarea
              style={{ height: 50, width: 400 }}
              className={errorDesc ? styles.error : ""}
              ref={descInputRef}
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <button type="submit">Add Todo</button>
      </div>
    </form>
  );
};

export default TodoForm;
