import React from "react";
import Database from "./firebase";
import { NavLink } from 'react-router-dom';

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
            <NavLink exact className="nav-link" to="/" activeClassName="active">Home</NavLink>
            <NavLink exact className="nav-link" to="/about" activeClassName="active">About</NavLink>
            <NavLink exact className="nav-link" to="/trade_record" activeClassName="active">Trade Record</NavLink>
            <NavLink exact className="nav-link" to="/show_record" activeClassName="active">Show Record</NavLink>
          </div>
        </div>
        <BtnLog />
      </div>
    </nav>
  );
}
