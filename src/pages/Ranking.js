import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../stylesheet/Ranking.css";
import url from "../lib/server";
import Button from "../components/Button";

const Dummy = [
  { username: "이찬행", score: 10 },
  { username: "노요셉", score: 5 }
];

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: Dummy
    }; // dummy
  }

  //* componentWillMount DOM manipulation X
  //* serverSide rendering => componentWillMount
  componentDidMount() {
    axios({
      url: `${url}/getrank`,
      method: "get"
    })
      .then(res => {
        console.log("랭크", res);
        this.setState({ userInfo: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // map 핑 한걸 뽑고

    return (
      <div className={`ranking-container`}>
        <div className={`ranking-item`}>
          <div className={`ranking-item-row`}>
            <div className={`page-title`}>RANKING</div>
            <div className={`ranking-item-row-info`}>TOP 10 PLAYERS</div>
          </div>
          <div className={`ranking-item-row`}>
            <div className={`ranking-item-row-header`}>
              <div className={`ranking-item-row-header-item`}></div>
              <div className={`ranking-item-row-header-item`}>USERNAME</div>
              <div className={`ranking-item-row-header-item`}>SCORE</div>
            </div>
          </div>
          <div className={`ranking-item-row`}>
            {this.state.userInfo.map((userdata, i) => (
              <div key={i} className={`ranking-item-row-body`}>
                <div className={`ranking-item-row-body-item`}>{i + 1}</div>
                <div className={`ranking-item-row-body-item`}>
                  {userdata.username}
                </div>
                <div className={`ranking-item-row-body-item`}>
                  {userdata.score}
                </div>
              </div>
            ))}
          </div>
          <div className={`ranking-item-row`}>
            <Link to={"/game/flappybird"}>
              <Button
                class={`button button-blue`}
                value={`Go back to Game`}
                type={`submit`}
                btnType={`GOBACKTOGAME`}
              ></Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
