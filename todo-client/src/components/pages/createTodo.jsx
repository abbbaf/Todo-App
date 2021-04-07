import Form from "../common/form";
import Container from "../container";
import todoService from "../../services/todoService";
import { toast } from 'react-toastify';
import { Route } from "../../router";
import { Link } from 'react-router-dom';
import Joi from "joi-browser";


class CreateTodo extends Form {

  state = {
    data: { title: "", description: "" },
    errors: {}
  };
 
  schema = {
    title: Joi.string().required().min(2).max(255),
    description: Joi.string().required().min(2).max(255),
  };
  
  doSubmit = async () => {
    const data = { ...this.state.data };
    await todoService.createTodo(data);
    toast("Your todo has been created");
    this.props.history.replace(Route.pages.myTodos.path);
  };

  render() {
    return (
      <Container header="Create New Todo Task">
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("title", "Title")} 
              {this.renderTextArea("description","Description",5)}
              {this.renderButton("Create")}
            <Link className="btn btn-primary ml-5" to={Route.pages.myTodos.path}>Cancel</Link> 
            </form>
          </div>
        </div>
      </Container>
    );
  }
}

export default CreateTodo;
