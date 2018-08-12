import React, { Component } from "react";
import fire from "../../config/Fire";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.switchToEnglish = this.switchToEnglish.bind(this);
    this.switchToPolish = this.switchToPolish.bind(this);

    this.state = {
      email: "",
      password: "",
      languageSwitch: 1,
      language: {
        email: ["E-Mail Address", "Adres E-Mail"],
        password: ["Password", "Hasło"],
        login: ["Login", "Zaloguj się"]
      }
    };
  }

  switchToEnglish() {
    this.setState({
      languageSwitch: 0
    });
  }
  switchToPolish() {
    this.setState({
      languageSwitch: 1
    });
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
      <main className="main">
        <div className="col-md-4 mb-2 ">
          <div
            className="btn-group btn-group-toggle languageSwitcher"
            data-toggle="buttons"
          >
            <label
              className="btn btn-outline-light active btn-language"
              onClick={this.switchToPolish}
            >
              <input
                type="radio"
                name="options"
                id="option1"
                autocomplete="off"
                checked
              />
              Polski
            </label>
            <label
              className="btn btn-outline-light btn-language"
              onClick={this.switchToEnglish}
            >
              <input
                type="radio"
                name="options"
                id="option2"
                autocomplete="off"
              />
              English
            </label>
          </div>
        </div>
        <div className="login-container">
          <form className="title text-center">
            <label for="Email">
              {this.state.language.email[this.state.languageSwitch]}
            </label>
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

            <label for="Password">
              {this.state.language.password[this.state.languageSwitch]}
            </label>
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
              {this.state.language.login[this.state.languageSwitch]}
            </button>
          </form>
        </div>
      </main>
    );
  }
}

export default Login;
