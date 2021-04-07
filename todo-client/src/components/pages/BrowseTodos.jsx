import React, { Component } from "react";
import Container from "../container";
import TodosTable from "../todosTable"
import todoService from "../../services/todoService";
import {toast} from 'react-toastify';

class BrowseTodos extends Component {

  state = {
    query: "",
    todos: []
  }

  operations(component) {
    return {
        async addToFavorites(todoId) {
          try {
            await todoService.addToFavorites(todoId);
            const todos = component.state.todos.map(todo => {
              if (todo._id === todoId) todo.is_in_favorites = true;
              return todo;
            });
            console.log(todos);
            component.setState({ todos });
            toast("Todo task added successfully");
          }
          catch (e) {
              if (e.response && e.response.status === 400) {
                toast("Cannot add this todo task");
              }
          }
        }
    }
  }


  handleChange = e => {
    this.setState( { query: e.target.value })
  }

  async componentDidMount() {
    const todos = await todoService.searchTodos();
    this.setState({ todos });
  }

  search = async () => {
    const todos = await todoService.searchTodos({ query: this.state.query });
    this.setState({ todos });
  }

  render() {
    const { query, todos } = this.state;

    return (
      <Container header="Browse Todos">
        <div className="row">
          <input name="query" value={query} placeholder="Search..." className="form-control" onChange={this.handleChange} />    
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mt-2" onClick={this.search}>Search</button>
        </div>
        <div className="row">
            <TodosTable todos={todos} operations={this.operations(this)} />
        </div>
      </Container>
    );
  }
}

export default BrowseTodos;


