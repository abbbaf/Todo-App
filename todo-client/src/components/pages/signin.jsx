import Form from "../common/form";
import Container from "../container";
import userService from '../../services/userService';
import Joi from "joi-browser";

class Signin extends Form {

  state = {
    data: { email: "", password: "" },
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
      .label("Password")
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: ex.response.data });
      }
    }
  };

  render() {
    return (
      <Container header="Sign in">
        <div className="row">
          <div className="col-12">
            <p>You can signin here with your account!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email","email")}
              {this.renderInput("password", "Password","password")} 
              {this.renderButton("Sign in")}
            </form>
          </div>
        </div>
      </Container>
    )
  }
}

export default Signin;
