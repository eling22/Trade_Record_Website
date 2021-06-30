import React from 'react';
import Database from './firebase';

var db = new Database()

class BtnLog extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.str ="google 登入"
    }
    handleClick() {
        if (db.is_log_in) this.logOut()
        else this.logIn()
        this.setState({ state: this.state });
    }
    logOut(){
        db.logOut()
        this.str = "google 登入";
    }
    logIn(){
        db.logIn()
        this.str = "登出";
    }
    render() {
        return (
            <button className="btn btn-outline-light" type="button" id = "btnLogOut" onClick={this.handleClick}>{this.str}</button>
        );
    }
}

export default function NavBar(){
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Eling's Web</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                <a className="nav-link" href="/about">About</a>
                <a className="nav-link" href="/show_record">Show Record</a>
              </div>
            </div>
            <form className="d-flex">
              <BtnLog></BtnLog>
            </form>
          </div>
        </nav>
    );
}

