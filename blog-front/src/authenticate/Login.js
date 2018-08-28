import React, { Component } from "react";
import "../css/App.css";
import { connect } from "react-redux";
import { loginUser } from "../actions/auth";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      user: this.state.user,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center h-100 align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6">
            {errors.Error && (
              <div className="alert alert-danger mt-1" role="alert">
                {errors.Error}
              </div>
            )}
            <form action="post" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  name="user"
                  type="text"
                  className="form-control"
                  id="username"
                  aria-describedby="username"
                  placeholder="Username"
                  onChange={this.onChange}
                  autoComplete="off"
                />
                {errors.user && (
                  <div className="alert alert-danger mt-1" role="alert">
                    {errors.user}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={this.onChange}
                  placeholder="Password"
                />
                {errors.password && (
                  <div className="alert alert-danger mt-1" role="alert">
                    {errors.password}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
