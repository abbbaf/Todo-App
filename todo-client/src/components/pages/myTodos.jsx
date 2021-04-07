import React, { Component } from "react";
import Container from "../container";
import { Link } from "react-router-dom";
import { Route } from "../../router";
import TodosTable from "../todosTable"
import todoService from "../../services/todoService";
import {toast} from 'react-toastify';

class MyTodos extends Component {

  state = {
    todos: []
  };


  operations(component) {
    return {
        async delete(todoId) {
          if (!window.confirm("Are you sure you want to remove this todo task")) return;
          try {
            await todoService.deleteTodo(todoId);
            toast("Todo task was removed successfully");
            const todos = component.state.todos.filter(todo => todo._id !== todoId);
            component.setState({ todos });
          } catch (e) {};
        },
        edit(todoId) {
          const path = Route.pages.editTodo.path.replace(/(?<=\/):[^/]+/,todoId);
          component.props.history.replace(path);
        }
    }
  }


  async componentDidMount() {
    const todos = await todoService.getMyTodos();
    this.setState({ todos })
  }

  render() {
    const pages = Route.pages;
    return (
      <Container header="My Todos">
        <div className="row">
          <div className="col-12">
              <p>
                <Link className="btn btn-primary" to={pages.createTodo.path}>
                  <i className="fas fa-plus-circle"></i>
                  <span className="ml-1">Add Todo Task</span>
                </Link>
              </p>
          </div>
          <div className="row">
            <TodosTable todos={this.state.todos} operations={this.operations(this)} />
          </div>
          <div className="row">
          </div>
        </div>
      </Container>
    );
  }
}

export default MyTodos;
