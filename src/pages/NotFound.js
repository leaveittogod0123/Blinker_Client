import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheet/NotFound.css";

export default class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <div className="sorry">SORRY PAGE NOT FOUND</div>
        <div className="error">404</div>
        <h1 className="ERROR"> ERROR </h1>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }
}
