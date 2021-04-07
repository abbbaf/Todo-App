import React from "react";

function Container(props) {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <h1>{props.header}</h1>
          </div>
        </div>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Container;
