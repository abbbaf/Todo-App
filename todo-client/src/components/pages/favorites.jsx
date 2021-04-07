import React, { Component } from "react";
import Container from "../container";
import TodosTable from "../todosTable"
import {toast} from 'react-toastify';
import todoService from "../../services/todoService";

class Favorites extends Component {

  state = {
    todos: []
  };

  operations(component) {
    return {
      async delete(todoId) {
        try {
          await todoService.removeFromFavorites(todoId);
          toast("Todo task removed successfully");
          const todos = component.state.todos.filter(todo => todo._id !== todoId);
          component.setState({ todos });
        } catch (e) {}
      }
    }
  }

  async componentDidMount() {
    const todos = await todoService.favoritesList();
    this.setState({ todos });
  }


  render() {

    return (
      <Container header="Favorites">
        <div className="row">
          <div className="col-12">
            <p>Here you can view your favorites list</p>
          </div>
          <div className="row">
            <TodosTable todos={this.state.todos} operations={this.operations(this)} />
          </div>
        </div>
      </Container>
    );
  }
}

export default Favorites;
