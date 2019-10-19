import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheet/NotFound.css";

export default class Forbidden extends Component {
  render() {
    return (
      <div className="not-found">
        <div className="sorry">Forbidden</div>
        <div className="error">403</div>
        <h1 className="ERROR"> Forbidden </h1>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }
}
