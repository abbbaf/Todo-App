import React, { Component } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Route } from '../router';

class Navbar extends Component {


  state = {}

  constructor(props) {
    super(props);
    this.state.pages = Route.pages;
    const pages = this.state.pages;
    this.pagesLeft = [pages.home, pages.myTodos, pages.browseTodos, pages.favorites];
    this.pagesRight = [pages.signin, pages.signup, pages.logout];
  }

  displayName(pageName,user) {
    const { pages } = this.state;
    if (user && pageName === pages.logout.pageName) 
        pageName += " " + user.name;
    return pageName;
  }

  render() {

    const pagesLeft = Route.getVisible(this.pagesLeft);
    const pagesRight = Route.getVisible(this.pagesRight);

    return ( 
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
         <Link className="navbar-brand" to={pagesLeft[0].path}>{pagesLeft[0].pageName}</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mr-auto">
              { pagesLeft.slice(1).map(({pageName, path}) => 
                <li key={path} className="nav-item">
                  <NavLink className="nav-link" to={path}>
                        {pageName}
                </NavLink>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ml-auto">
              { pagesRight.map(({pageName, path}) => 
                <li key={path} className="nav-item">
                  <NavLink className="nav-link" to={path}>
                        {pageName}
                </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
