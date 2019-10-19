import React, { Component } from "react";
import Button from "../components/Button";
import axios from "axios";
import url from "../lib/server";
import { Link } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      confirmPassword: "",
      error: false,
      done: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  post = (id, pwd, cpwd) => {
    console.log(id, pwd, cpwd);
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    var validfirstUsername = id.match(usernameRegex);

    if (id === "") {
      this.setState({
        error: true,
        helperText: "AT LEAST 4 LETTERS ON ID"
      });
      return;
    }

    if (pwd === cpwd) {
      if (validfirstUsername) {
        axios
          .post(`${url}/signup`, {
            username: id,
            password: pwd,
            key: "secret"
          })
          .then(res => {
            console.log("회원가입", res);
            if (res.status === 200) {
              this.setState({ done: true });
            }
          })
          .catch(err => {
            if (err.response) {
              console.log("err", err.response.data);
            }
            console.log("에러", err);
            this.setState({
              error: true,
              helperText: "USERNAME ALREADY EXISTS"
            });
          });
      } else {
        this.setState({
          error: true,
          helperText: "USERNAME IS NOT VALID"
        });
      }
    } else {
      this.setState({
        error: true,
        helperText: "PLEASE CONFIRM YOUR PASSWORD"
      });
    }
  };

  render() {
    let content = "";
    if (this.state.done) {
      console.log("done true");
      content = (
        <div className={`login-container`}>
          <div className={`login-header`}>
            <Link to="/">
              <img src="/img/logo.png" alt="logo" />
            </Link>
          </div>
          <div className={`login-done`}>
            <h3>SIGN UP</h3>
            <p>THANKS FOR SIGNING UP!</p>
            <p>PLEASE ENJOY BLINKER</p>
            <Button
              class={`button button-red button-home`}
              type={`submit`}
              name={`signUp`}
              value={`HOME`}
              btnType={`HOME`}
            />
          </div>
        </div>
      );
    } else {
      console.log("done false");
      content = (
        <div className={`login-container`}>
          <div className={`login-header`}>
            <Link to="/">
              <img src="/img/logo.png" alt="logo" />
            </Link>
          </div>
          <div className={`login-box`}>
            <form className={`login-form`}>
              <h3>SIGN UP</h3>
              <input
                className={`input-login input-id`}
                placeholder={`USERNAME`}
                type={`text`}
                value={this.state.name}
                onChange={this.handleChange}
                name={`name`}
              />
              <input
                className={`input-login`}
                placeholder={`PASSWORD`}
                type={`password`}
                value={this.state.password}
                onChange={this.handleChange}
                name={`password`}
              />{" "}
              <input
                className={`input-login`}
                placeholder={`CONFIRMPASSWORD`}
                type={`password`}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                name={`confirmPassword`}
              />
              <div>
                {this.state.helperText ? (
                  <div>{this.state.helperText}</div>
                ) : (
                  ""
                )}
              </div>
              <Button
                class={`button button-red button-signup`}
                type={`submit`}
                name={`signUp`}
                value={`SIGN UP`}
                btnType={`SIGN UP`}
                username={this.state.name}
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                post={this.post}
              />
            </form>
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default SignUp;
