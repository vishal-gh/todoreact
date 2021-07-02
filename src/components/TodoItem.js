import React, { useState } from "react";
import styles from "./TodoItem.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const TodoItem = (props) => {
  const deleteLink =
    "http://localhost:4000/api/v1/todo_lists/" +
    props.todolistid +
    "/todo_items/" +
    props.id;

  const moveItemLink =
    "http://localhost:4000/api/v1/todo_lists/" +
    props.todolistid +
    "/todo_items/" +
    props.id +
    "/move";

  let postLink =
    "http://localhost:4000/api/v1/todo_lists/" +
    props.todolistid +
    "/todo_items/" +
    props.id +
    "/complete";

  let completeLinkText = "Complete";
  if (props.completed === "Yes") {
    completeLinkText = "Incomplete";
    postLink =
      "http://localhost:4000/api/v1/todo_lists/" +
      props.todolistid +
      "/todo_items/" +
      props.id +
      "/incomplete";
  }

  const completeTodoItem = async () => {
    try {
      const response = await axios.post(postLink);
      if (!response.statusText === "OK") {
        throw new Error("An error has occured");
      } else {
        console.log(response);
        props.onCompleteToDoItem(response.data.message);
      }
    } catch (error) {
      props.onCompleteToDoItem(error.message);
    }
  };

  const deleteTodoItem = async () => {
    if (window.confirm("are you sure?") === true) {
      try {
        const response = await axios.delete(deleteLink);
        if (!response.statusText === "OK") {
          throw new Error("An error has occured");
        } else {
          props.onDeleteTodoItem(response.data.message);
        }
      } catch (error) {
        props.onDeleteTodoItem(error.message);
      }
    }
  };

  const moveTodoItem = async (event) => {
    try {
      const response = await axios.post(moveItemLink, {
        newtodo: event.target.options[event.target.selectedIndex].id,
      });
      if (!response.statusText === "OK") {
        throw new Error("An error has occured");
      } else {
        props.onMoveTodoItem(response.data.message);
      }
    } catch (error) {
      props.onMoveTodoItem(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.row}>
        <div className={styles.cell}>{props.name}</div>
        <div className={styles.cell}>{props.completed}</div>
        <div className={styles.cell}>{props.isrecurring}</div>
        <div className={styles.cell}>{props.datecompleted}</div>
        <div className={styles.cell}>
          {props.tags.map((item) => {
            return <div key={item.id}>{item.tagname}</div>;
          })}
        </div>
        <div className={styles.cell}>
          <Link onClick={completeTodoItem}>{completeLinkText}</Link>
        </div>
        <div className={styles.cell}>
          <select onChange={moveTodoItem}>
            <option key="0" id="0">
              Select
            </option>
            {props.todolists
              .filter(function (item) {
                return item.id != props.todolistid;
              })
              .map((item) => {
                return (
                  <option key={item.id} id={item.id}>
                    {item.title}
                  </option>
                );
              })}
          </select>
        </div>
        <div className={styles.cell}>Edit</div>
        <div className={styles.cell}>
          <Link onClick={deleteTodoItem}>Delete</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TodoItem;
