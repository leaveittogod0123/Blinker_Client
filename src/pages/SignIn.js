import React, { Component } from "react";
import "../stylesheet/SignIn.css";
import Button from "../components/Button";
import { Redirect } from "react-router";
import axios from "axios";
import url from "../lib/server";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
// import axiosCookieJarSupport from "axios-cookiejar-support";
// import tough from "tough-cookie";

class SignIn extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      error: false,
      done: false
      // helperText: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  post = (id, pwd) => {
    if (id === "") {
      this.setState({
        error: true,
        helperText: "AT LEAST 4 LETTERS ON ID"
      });

      return;
    }

    axios
      .post(`${url}/signin`, {
        username: id,
        password: pwd,
        key: "secret"
      })
      .then(res => {
        const { cookies } = this.props;
        cookies.set(`username`, id);
        if (res.status === 200) {
          this.setState({ done: true });
        }
      })
      .catch(err => {
        if (err.response) {
          console.log("err", err.response.data);
        }
        this.setState({
          error: true,
          helperText: "USERNAME ALREADY EXISTS"
        });
      });
  };

  render() {
    let content = "";
    if (this.state.done) {
      return <Redirect to="/game" />;
    } else {
      content = (
        <div className={`login-container`}>
          <div className={`login-header`}>
            <img src="/img/logo.png" alt="logo" />
          </div>
          <div className={`login-box`}>
            <form className={`login-form`}>
              <h3> PLEASE SIGNIN TO START THE GAME</h3>
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
              />
              {this.state.helperText ? <h1>{this.state.helperText}</h1> : ""}
              <Button
                id={`login-btn`}
                class={`button button-red button-signin`}
                type={`submit`}
                name={`signin`}
                value={`SIGN IN`}
                btnType={`SIGN IN`}
                username={this.state.name}
                password={this.state.password}
                post={this.post}
              />
              <Button
                id={`signup-btn`}
                class={`button button-blue button-create-an-account`}
                type={`submit`}
                name={`signUp`}
                value={`CREATE AN ACCOUNT`}
                btnType={`CREATE AN ACCOUNT`}
              />
            </form>
          </div>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

export default withCookies(SignIn);
