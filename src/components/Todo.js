import styles from "./Todo.module.css";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = (props) => {
  const deleteLink = "http://localhost:4000/api/v1/todo_lists/" + props.id;
  const editLink = props.id + "/edit-todo";
  const manageLink = props.id + "/todo-items";

  const deleteTodo = async () => {
    if (window.confirm("are you sure?") === true) {
      try {
        const response = await axios.delete(deleteLink);
        if (!response.statusText === "OK") {
          throw new Error("An error has occured");
        } else {
          props.onTodoListDelete(response.data.message);
        }
      } catch (error) {
        props.onTodoListDelete(error.message);
      }
    }
  };

  return (
    <React.Fragment>
      <div className={styles.row}>
        <div className={styles.cell}>{props.title}</div>
        <div className={styles.cell}>{props.description}</div>
        <div className={styles.cell}>
          {props.todo_items.map((item) => {
            return <div key={item.id}>{item.name}</div>;
          })}
        </div>
        <div className={styles.cell}>Edit</div>
        <div className={styles.cell}>
          <Link to={manageLink}>Manage</Link>
        </div>
        <div className={styles.cell}>
          <Link onClick={deleteTodo}>Delete</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Todo;
