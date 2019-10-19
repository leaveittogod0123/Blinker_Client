import React, { Component } from "react";
import GameListItem from "../components/GameListItem";
import "../stylesheet/Home.css";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 id="page-title">CHOOSE A GAME</h1>
        <div className={`home-container`}>
          <div className={`home-item`}>
            <GameListItem />
          </div>
          <div className={`home-item`}>
            <GameListItem />
          </div>
          <div className={`home-item`}>
            <GameListItem />
          </div>
        </div>
      </div>
    );
  }
}
