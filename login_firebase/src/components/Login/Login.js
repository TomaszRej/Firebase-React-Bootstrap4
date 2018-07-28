import React, { Component } from "react";
import fire from "../../config/Fire";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="login-container">
        <form className="title text-center">
          <label for="Email">Email</label>
          <input
            value={this.state.email}
            onChange={this.handleChange}
            type="email"
            name="email"
            className="form-control"
            id="Email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />

          <label for="Password">Password</label>
          <input
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            name="password"
            className="form-control"
            id="Password"
            placeholder="Password"
          />

          <button
            type="submit"
            onClick={this.login}
            className="btn btn-primary btn-block"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
