import React, { Component } from "react";

export default class FlappyBird extends Component {
  componentDidMount() {
    const scriptCdn = document.createElement("script");
    scriptCdn.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.js";
    document.body.appendChild(scriptCdn);

    const script = document.createElement("script");
    script.src = "/games/flappyBird.js";
    document.body.appendChild(script);
  }

  render() {
    return <div>here</div>;
  }
}
