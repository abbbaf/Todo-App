import "./App.css";
import React, { Component } from "react";
import { Route, Switch } from "./router";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyTodos from "./components/pages/myTodos";
import CreateTodo from "./components/pages/createTodo";
import EditTodo from "./components/pages/editTodo";
import BrowseTodos from "./components/pages/BrowseTodos";
import Home from "./components/pages/home";
import Signin from "./components/pages/signin";
import Signup from "./components/pages/signup";
import Logout from "./components/pages/logout";
import Favorites from "./components/pages/favorites";


const authUser = (user) => !user && Route.pages.signin.path;
const notAuthUser = (user) => user && Route.pages.myTodos.path;

function routeLinks(shouldRender) {
    return (
      <Switch shouldRender={shouldRender}>
        <Route
          pageName="My Todos"
          path="/my-todos"
          component={MyTodos}
          redirectTo={authUser}
        />
        <Route
          pageName="Create Todo"
          path="/create-todo"
          component={CreateTodo}
          redirectTo={authUser}
        />
        <Route
          pageName="Favorites"
          path="/favorites"
          component={Favorites}
          redirectTo={authUser}
        />
        <Route
          pageName="Edit Todo"
          path="/edit-todo/:id"
          component={EditTodo}
          redirectTo={authUser}
        />
        <Route
          pageName="Browse Todos"
          path="/browse-todos"
          component={BrowseTodos}
          redirectTo={authUser}
        />
        <Route
          pageName="Logout"
          path="/logout"
          component={Logout}
          redirectTo={authUser}
        />
        <Route
          pageName="Signin"
          path="/signin"
          component={Signin}
          redirectTo={notAuthUser}
        />
        <Route
          pageName="Signup"
          path="/signup"
          component={Signup}
          redirectTo={notAuthUser}
        />
        <Route 
          pageName="Todo App" 
          path="/" exact 
          component={Home}
          redirectTo={notAuthUser}
      />
      </Switch>
    );
  }


class App extends Component {

  componentDidMount() {
    if (Route.user) this.setState({ auth: true });
  }

  render() {
    return (
      <React.Fragment>
        {Route.pages ? null : routeLinks(false)};
        <ToastContainer />
        <header>
          <Navbar />
        </header>
        <main className="minh-900">{routeLinks(true)}</main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
