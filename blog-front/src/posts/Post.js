import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../actions/posts";
import "../css/App.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      text: this.state.text
    };
    this.props.addPost(newPost);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center h-100 align-items-center">
          <div className="col-lg-8 col-md-10 col-sm-10">
            <form action="post" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  placeholder="Enter a title"
                  autoComplete="off"
                  onChange={this.onChange}
                />
                {errors.title && (
                  <div className="alert alert-danger mt-1" role="alert">
                    {errors.title}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="post">Post</label>
                <textarea
                  name="text"
                  className="form-control"
                  id="textarea"
                  rows="3"
                  placeholder="Type something out!"
                  onChange={this.onChange}
                />
                {errors.text && (
                  <div className="alert alert-danger mt-1" role="alert">
                    {errors.text}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(Post);
