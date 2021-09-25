import React from "react";
import Database from "./firebase";

var db = new Database();

class BtnLog extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      string: "google 登入",
      is_log_in: false
    };
  }
  handleClick() {
    if (db.is_log_in) db.logOut();
    else db.logIn();
    this.setState({ is_log_in: !this.state.is_log_in });
  }
  render() {
    const string = this.state.is_log_in ? "登出" : "google 登入";
    return (
      <button
        className="btn btn-outline-light"
        type="button"
        id="btnLogOut"
        onClick={this.handleClick}
      >
        {string}
      </button>
    );
  }
}

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Eling's Web
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <a className="nav-link" href="/about">
              About
            </a>
            <a className="nav-link" href="/trade_record">
              Trade Record
            </a>
            <a className="nav-link" href="/show_record">
              Show Record
            </a>
          </div>
        </div>
        <BtnLog></BtnLog>
      </div>
    </nav>
  );
}
