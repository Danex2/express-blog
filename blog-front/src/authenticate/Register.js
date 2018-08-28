import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      user: this.state.user,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    console.log(errors);
    return (
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center h-100 align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6">
            {errors.Error && (
              <div className="alert alert-danger mt-1" role="alert">
                {errors.Error}
              </div>
            )}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  name="user"
                  type="text"
                  className="form-control"
                  id="username"
                  aria-describedby="username"
                  placeholder="Username"
                  autoComplete="off"
                  onChange={this.onChange}
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
                  placeholder="Password"
                  onChange={this.onChange}
                />
                {errors.password && (
                  <div className="alert alert-danger mt-1" role="alert">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="Confirm Password">Confirm Password</label>
                <input
                  name="password2"
                  type="password"
                  className="form-control"
                  id="password2"
                  placeholder="Password"
                  onChange={this.onChange}
                />
                {errors.password2 && (
                  <div className="alert alert-danger mt-1" role="alert">
                    {errors.password2}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Register
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
  { registerUser }
)(Register);
