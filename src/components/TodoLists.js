import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import styles from "./TodoLists.module.css";
import axios from "axios";
import TodoForm from "./TodoForm";
import TableHead from "./TableHead";
import { Link } from "react-router-dom";

const TodoLists = () => {
  let defaultList = <p>No records found.</p>;

  const [todolists, setTodoLists] = useState([]);
  const [topMessage, setTopMessage] = useState("");
  const [topError, setTopError] = useState(false);

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const fetchDataHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/todo_lists"
      );
      if (!response.statusText === "OK") {
        throw new Error("An error has occured");
      } else {
        setTodoLists(response.data);
      }
    } catch (error) {
      setTopMessage(error.message);
    }
  };

  const onTodoListDeleteHandler = (message) => {
    fetchDataHandler();
    setTopMessage(message);
  };

  const onTodoAddHandler = (message, error) => {
    fetchDataHandler();
    setTopMessage(message);
    setTopError(error);
  };

  const onTodoUpdatedHandler = (message) => {
    fetchDataHandler();
    setTopMessage(message);
  };

  if (todolists.length > 0) {
    defaultList = todolists.map((list) => (
      <Todo
        key={list.id}
        id={list.id}
        title={list.title}
        description={list.description}
        todo_items={list.todo_items}
        onTodoListDelete={onTodoListDeleteHandler}
        onTodoUpdate={onTodoUpdatedHandler}
      ></Todo>
    ));
  }

  return (
    <React.Fragment>
      <h1>Todo Lists</h1>
      <p className={!topError ? styles.notice : styles.errors}>{topMessage}</p>
      <div className={styles.leftbox}>
        <TableHead type="1"></TableHead>
        {defaultList}
      </div>
      <div className={styles.rightbox}>
        <TodoForm onAddTodo={onTodoAddHandler}></TodoForm>
        <Link to="/search">Search</Link>
      </div>
    </React.Fragment>
  );
};

export default TodoLists;
