import React, { Component } from "react";
import Button from "./Button";

export default class GameListItem extends Component {
  render() {
    return (
      <div className="game-box">
        <h1>Flappy Bird</h1>
        <img src={`/img/flappyBird.jpg`} alt={`game-thumbnail`} />
        <p>
          Flappy Bird is a side-scrolling mobile game featuring 2D retro style
          graphics. The objective is to direct a flying bird, named Faby, who
          moves continuously to the right, between sets of Mario-like pipes. If
          the player touches the pipes, they lose.
        </p>
        <Button
          id={`login-btn`}
          class={`start-flappy-btn txtb`}
          type={`submit`}
          name={`signin`}
          value={`START`}
          btnType={`START`}
        />
      </div>
    );
  }
}
