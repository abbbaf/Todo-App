import Form from "../common/form";
import Container from "../container";
import todoService from "../../services/todoService";
import { toast } from 'react-toastify';
import { Route } from "../../router";
import { Link } from 'react-router-dom';
import Joi from "joi-browser";

class EditTodo extends Form {

  state = {
    data: { title: "", description: "" },
    errors: {}
  };
 
  schema = {
    title: Joi.string().required().min(2).max(255),
    description: Joi.string().required().min(2).max(255),
  };
  
  doSubmit = async () => {
    const { data } = this.state;
    data._id = this.props.match.params.id;
    await todoService.editTodo(data);
    toast("Todo details updated!");
    this.props.history.replace(Route.pages.myTodos.path);
  };
  
  async componentDidMount() {
    try {
      const response = await todoService.getTodo(this.props.match.params.id);
      const data = { title: response.title, description: response.description };
      this.setState({ data });
    }
    catch (e) { this.props.history.replace(Route.pages.myTodos.path); }
  }

  render() {
    return (
      <Container header="Edit Todo Form">
        <div className="row">
          <div className="col-12">
            <p>Update your card details</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("title", "Title")} 
              {this.renderTextArea("description","Description",5)}
              {this.renderButton("Save")}
            <Link className="btn btn-primary ml-5" to={Route.pages.myTodos.path}>Cancel</Link> 
          </form>

          </div>
        </div>
      </Container>
    );
  }
}

export default EditTodo;
