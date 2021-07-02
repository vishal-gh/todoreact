import React, { useState, useEffect } from "react";
import styles from "./TodoItemForm.module.css";
import axios from "axios";

const TodoItemForm = (props) => {
  const postLink =
    "http://localhost:4000/api/v1/todo_lists/" +
    props.todolistid +
    "/todo_items";
  const [enteredName, setEnteredName] = useState("");
  const [enteredTags, setEnteredTags] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/public/bootstrap-tagsinput.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const tagChangeHandler = (event) => {
    setEnteredTags(event.target.value);
  };

  const recurringChangeHandler = (event) => {
    setChecked(event.target.checked);
  };

  const submitHandler = (event) => {
    event.preventDefault();
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

    setEnteredName("");
    setEnteredTags("");
    setChecked(false);
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
              value={enteredName}
              onChange={nameChangeHandler}
              style={{ width: 200 }}
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
              value={enteredTags}
              onChange={tagChangeHandler}
              style={{ width: 200 }}
              name="tagname"
              id="tagname"
              data-role="tagsinput"
            ></input>
          </div>
          <div className={styles.row}>
            <div className={styles.tablecell}></div>
            <div className={styles.tablecell}>
              <input
                type="checkbox"
                checked={checked}
                onChange={recurringChangeHandler}
              ></input>
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
