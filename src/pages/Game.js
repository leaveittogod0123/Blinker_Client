import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import FlappyBirdGame from "../components/FlappyBirdGame";
import { Home, NotFound, Ranking } from "../pages";
import "../stylesheet/Home.css";
import Forbidden from "./Forbidden";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";


class Game extends Component {
  // eslint-disable-next-line no-unused-vars
  constructor(props, { match }) {
    super(props);

    const { cookies } = props;
    this.state = {
      match: match,
      loggedIn: cookies.get("username") || ""
    };
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <Header />
          <Switch>
            <Route path={`/game/ranking`} component={Ranking} />
            <Route path={`/game/flappyBird`} component={FlappyBirdGame} />
            <Route exact path={`/game`} component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <Switch>
            <Route component={Forbidden} />
          </Switch>
        </div>
      );
    }

  }
}

export default withCookies(Game);
