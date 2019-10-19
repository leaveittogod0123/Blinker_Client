import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheet/Header.css";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

// eslint-disable-next-line
// const NavBar = ({ children }) => <div className="menu-item">{children}</div>;
class Header extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render() {
    const { cookies } = this.props;

    return (
      <nav>
        <div id="nav-left" className="header-blink">
          <Link to="/game">
            <img src="/img/logo.png" alt="logo" />
          </Link>
        </div>

        <div id="nav-center">
          <span>USERNAME</span>
        </div>

        <div id="nav-right">
          <span>
            <Link to="/game/ranking">RANKING</Link>
          </span>
          <span>
            <Link
              to="/"
              onClick={() => {
                cookies.remove("username", { path: "/" });
              }}
            >
              LOGOUT
            </Link>
          </span>
        </div>

        {/* <div className="center">
          <NavBar>
            <span>USERNAME</span>
            <div className={`header-blink`}></div>
          </NavBar>
          <NavBar>
            <div>HIGHEST SCORE</div>
          </NavBar>
          <NavBar>
            <Link to="/game/ranking">
              <div>RANKING</div>
            </Link>
          </NavBar>
        </div> */}
      </nav>
    );
  }
}
export default withCookies(Header);
