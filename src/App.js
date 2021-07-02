import React from "react";
import "./App.css";
import TodoLists from "./components/TodoLists";
import { Route } from "react-router-dom";
import TodoItems from "./components/TodoItems";
import Search from "./components/Search";

function App() {
  return (
    <React.Fragment>
      <Route path="/" exact>
        <TodoLists></TodoLists>
      </Route>
      <Route path="/:todoListId/todo-items" exact>
        <TodoItems></TodoItems>
      </Route>
      <Route path="/search" exact>
        <Search></Search>
      </Route>
    </React.Fragment>
  );
}

export default App;
