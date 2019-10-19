import React, { Component } from "react";
import "../stylesheet/Button.css";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

class Button extends Component {
  static propTypes = {
    post: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    btnType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      btnRender: ""
    };
  }

  btnClick = e => {
    e.preventDefault();
    if (["SIGN IN", "SIGN UP"].includes(this.props.btnType)) {
      this.props.post(
        this.props.username,
        this.props.password,
        this.props.confirmPassword
      );
    } else {
      this.setState({
        btnRender: this.props.btnType
      });
    }
  };

  render() {
    let content = "";

    if (["START", "GOBACKTOGAME"].includes(this.state.btnRender)) {
      return <Redirect to={`/game/flappyBird`} />;
    } else if (this.state.btnRender === "CREATE AN ACCOUNT") {
      return <Redirect to={`/signup`} />;
    } else if (this.state.btnRender === "HOME") {
      return <Redirect to={`/`} />;
    } else {
      content = (
        <div>
          <input
            id={this.props.id}
            type={this.props.type}
            className={this.props.class}
            name={this.props.name}
            value={this.props.value}
            onClick={this.btnClick}
          />
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

export default Button;
