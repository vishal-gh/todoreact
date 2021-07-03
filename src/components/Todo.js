import styles from "./Todo.module.css";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

const Todo = (props) => {
  const deleteLink = "http://localhost:4000/api/v1/todo_lists/" + props.id;
  const editLink = props.id + "/edit-todo";
  const manageLink = props.id + "/todo-items";
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [todoListId, setTodoListId] = React.useState(0);
  const [todoListTitle, setTodoListTitle] = React.useState("");
  const [todoListDesc, setTodoListDesc] = React.useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      height: 400,
    },
  };
  const openModal = (id, title, description) => {
    setTodoListId(id);
    setTodoListTitle(title);
    setTodoListDesc(description);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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

  const onUpdateTodoHander = async (id) => {
    const updateLink = "http://localhost:4000/api/v1/todo_lists/" + id;
    try {
      const todo_list = {
        title: todoListTitle,
        description: todoListDesc,
      };
      const response = await axios.patch(updateLink, todo_list);
      if (!response.statusText === "OK") {
        throw new Error("An error has occured");
      } else {
        props.onTodoUpdate(response.data.message);
      }
    } catch (error) {
      props.onTodoUpdate("Update failed");
    }
    closeModal();
  };

  const titleChangeHandler = (event) => {
    setTodoListTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setTodoListDesc(event.target.value);
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
        <div className={styles.cell}>
          <Link
            onClick={() => openModal(props.id, props.title, props.description)}
          >
            Edit
          </Link>
        </div>
        <div className={styles.cell}>
          <Link to={manageLink}>Manage</Link>
        </div>
        <div className={styles.cell}>
          <Link onClick={deleteTodo}>Delete</Link>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Todo"
        style={customStyles}
        ariaHideApp={false}
      >
        <h1>{todoListId}</h1>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.tablecell}>
              <label>Title</label>
            </div>
            <div className={styles.tablecell}>
              <input
                type="text"
                value={todoListTitle}
                onChange={titleChangeHandler}
                style={{ width: 400 }}
              ></input>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.tablecell}>
              <label>Description</label>
            </div>
            <div className={styles.tablecell}>
              <textarea
                value={todoListDesc}
                style={{ height: 50, width: 400 }}
                onChange={descriptionChangeHandler}
              ></textarea>
            </div>
          </div>
        </div>
        <button onClick={() => onUpdateTodoHander(props.id)}>Update</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </React.Fragment>
  );
};

export default Todo;
