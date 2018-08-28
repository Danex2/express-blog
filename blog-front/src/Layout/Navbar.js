import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";
import { clearCurrentProfile } from "../actions/auth";

class Navbar extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const authenticated = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link onClick={this.onLogoutClick} className="nav-link" to="/login">
            Sign Out
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/post">
            Make a Post
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/posts">
            Posts
          </Link>
        </li>
      </ul>
    );

    const notAuthenticated = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/login">
            Express Blog
          </Link>
          {isAuthenticated ? authenticated : notAuthenticated}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
