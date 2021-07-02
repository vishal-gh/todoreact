import React, { useState, useEffect } from "react";
import styles from "./TodoItems.module.css";
import { useParams } from "react-router-dom";
import TodoItem from "./TodoItem";
import axios from "axios";
import { Link } from "react-router-dom";
import TableHead from "./TableHead";
import TodoItemForm from "./TodoItemForm";

const TodoItems = () => {
  const params = useParams();
  const todosLink = "http://localhost:4000/api/v1/todo_lists";
  const todoItemsLink =
    "http://localhost:4000/api/v1/todo_lists/" +
    params.todoListId +
    "/todo_items";

  const [topMessage, setTopMessage] = useState("");
  const [todoitems, setTodoItems] = useState([]);
  const [todolists, setTodoLists] = useState([]);

  let defaultList = <p>No records found.</p>;

  useEffect(() => {
    fetchItemsDataHandler();
    fetchAllTodoLists();
  }, []);

  const fetchAllTodoLists = async () => {
    try {
      const response = await axios.get(todosLink);
      if (!response.statusText === "OK") {
        throw new Error("An error has occured");
      } else {
        setTodoLists(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchItemsDataHandler = async () => {
    try {
      const response = await axios.get(todoItemsLink);
      if (!response.statusText === "OK") {
        throw new Error("An error has occured");
      } else {
        setTodoItems(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const Refresh = (message) => {
    fetchItemsDataHandler();
    setTopMessage(message);
  };

  const onCompleteTodoHandler = (message) => {
    Refresh(message);
  };

  const onDeleteTodoHandler = (message) => {
    Refresh(message);
  };

  const onMoveTodoHandler = (message) => {
    Refresh(message);
  };

  if (todoitems.length > 0) {
    defaultList = todoitems.map((list) => (
      <TodoItem
        key={list.id}
        id={list.id}
        todolistid={params.todoListId}
        name={list.name}
        completed={list.completed}
        datecompleted={list.datecompleted}
        isrecurring={list.isrecurring}
        tags={list.tags}
        todolists={todolists}
        onCompleteToDoItem={onCompleteTodoHandler}
        onDeleteTodoItem={onDeleteTodoHandler}
        onMoveTodoItem={onMoveTodoHandler}
      ></TodoItem>
    ));
  }

  const onAddTodoItemHandler = (message) => {
    fetchItemsDataHandler();
    setTopMessage(message);
  };

  return (
    <React.Fragment>
      <h1>Todo Items</h1>
      <p className={styles.notice}>{topMessage}</p>
      <div className={styles.leftbox}>
        <TableHead type="2"></TableHead>
        {defaultList}
        <Link to="/">Back</Link>
      </div>
      <div className={styles.rightbox}>
        <TodoItemForm
          todolistid={params.todoListId}
          onAddTodoItem={onAddTodoItemHandler}
        ></TodoItemForm>
      </div>
    </React.Fragment>
  );
};

export default TodoItems;
