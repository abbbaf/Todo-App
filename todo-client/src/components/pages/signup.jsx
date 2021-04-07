import Form from "../common/form";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { Route } from "../../router";
import Container from "../container";
import Joi from "joi-browser";
import userService from "../../services/userService"


class Signup extends Form {

  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  };
 
  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password"),
    name: Joi.string()
      .required()
      .min(2)
      .label("Name")
  };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      await userService.signup(data);
      this.props.history.replace(Route.pages.myTodos.path);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email is taken" } });
      }
    }
  };


  render() {
    return (
      <Container header="Signup">
        <div className="row">
          <div className="col-12">
            <p>You can open new account for free!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("name", "Name",)}
              {this.renderInput("email", "Email","email")}
              {this.renderInput("password", "Password","password")}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
      </Container>
    );
  }
}

export default Signup;






