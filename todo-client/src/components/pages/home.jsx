import React, { Component } from "react";
import Container from "../container";

class Home extends Component {
  render() {
    return (
      <Container header="Todo App Home Page">
        <div className="row">
          <div className="col-12">
            <p>Regain clarity and calmness by getting all those tasks out of your head and onto your to-do list (no matter where you are or what device you use).</p>
          </div>
        </div>
      </Container>
    );
  }
}

export default Home;
