import React, { Component } from "react";
import FlappyBird from "../components/FlappyBird";

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <div id="_wrapper">
          <div id="_content">
            <video id="_webcam" playsInline style={{ display: "none" }} />
            <canvas id="_imageData" />
            <canvas id="_faceSub" />
            <canvas id="_t3d" />
            <canvas id="_f3d" />
            <canvas id="_drawing" />
            <div id="_progressBar" />
          </div>
        </div>
        <div id="gameContainer">
          <FlappyBird />
        </div>
      </div>
    );
  }
}
