import React from "react";
import Todo from "./todo";

function TodosTable({ todos, operations }) {
    return (
      <React.Fragment>
        {todos.length ?
          todos.map(todo => <Todo key={todo._id} todo={todo} operations={operations} />) 
         : null }
      </React.Fragment>
    );
}

export default TodosTable;
