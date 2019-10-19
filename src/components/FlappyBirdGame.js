import FlappyBird from "./FlappyBird";
import "../stylesheet/FlappyBirdGame.css";
import ButtonNav from "./ButtonNav";
import axios from "axios";
import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import url from "../lib/server";

class FlappyBirdGame extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      score: 0,
      username: cookies.get("username") || "DOOPAL"
    };
    window.reactMethod = this;
  }

  updateScore() {
    this.setState({ score: this.state.score + 1 });
  }

  // 이 함수는 /public/game/flappyBird.js에 die()함수에서 호출할 겁니다.
  // 그래서 게임이 끝났을때 서버로 요청을 보낼겁니당.
  post() {
    axios({
      url: `${url}/score`,
      method: "post",
      data: {
        username: this.state.username || "doopal", // userId는 signin할때 props로 내려줘야겠죠.
        gamename: "flappybird", // 현재는 게임이 한개라서 하드 코딩하는데 이 gameId는 어디서 관리할지 모르겠네요.
        score: this.state.score,
        key: "secret"
      }
    })
      .then(res => {
        console.log("스코어보냈어요", res); // score를 서버에 HTTP POST 요청을 보낸후에 할 작업을 여기에 넣어주세요.
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className={`game-info`}>FLAPPYBIRD</div>
        <div className={`game-score`}>
          <span>SCORE:{this.state.score}</span>
        </div>
        <div className="container">
          <div className={`item`}>
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
          </div>
          <div className={`item`}>
            <div id="game-play-screen">
              <div id="game-play-screen-gameover">
                <div id="game-over-text">GAME OVER</div>
              </div>
              {/* <div id="game-play-screen-gameover">
                <div id="game-play-screen-game">GAME</div>
                <div id="game-play-screen-over">OVER</div>
              </div> */}
            </div>
            <FlappyBird />
          </div>
        </div>
        <div id={`button-nav`}>
          <ButtonNav />
        </div>
      </div>
    );
  }
}

export default withCookies(FlappyBirdGame);
