import React, { Component } from "react";
import documentReady from "document-ready-promise";
import cdnPromise from "cdn-promise";

function loadScript() {
  return Promise.all([
    cdnPromise("/js/BRFv4Demo.js"),
    cdnPromise("/js/libs/createjs/preloadjs.min.js"),
    documentReady()
  ])
    .then(() => window.brfv4Example.start())
    .catch(err => {
      console.error(err);
    });
}

export default class FlappyBird extends Component {
  componentDidMount() {
    loadScript();
  }
  render() {
    return <div></div>;
  }
}
