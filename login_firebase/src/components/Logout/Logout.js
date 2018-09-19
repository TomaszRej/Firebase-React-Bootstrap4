import React, { Component } from "react";

class Logout extends Component {
  render() {
    return (
      <button onClick={this.props.logout} className="btn btn-success btn-lg ">
        Logout
      </button>
    );
  }
}

export default Logout;
