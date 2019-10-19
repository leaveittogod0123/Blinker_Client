import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Game, SignUp, SignIn, NotFound } from "../pages";

import { withRouter } from "react-router-dom";

class App extends Component {

  // eslint-disable-next-line constructor-super
  constructor(props, { match }) {
    super(props);
    this.state = {
      match: match
    };
  }

  render() {

    // eslint-disable-next-line react/prop-types
    if (this.props.match.path !== "/game/flappyBird" && window.cameraStop) {
      console.log("카메라 스탑", window.cameraStop);
      window.cameraStop();
    }

    //400 bad request각 각 페이지에서 렌더링해주는 부분에서 분기를 처리해야겠음. 프레임워크에서 지원되는지는 모르겠음.

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route component={Badrequest} />
          </Switch>
        </div>
      );
    }
  }
}

export default withRouter(App);
