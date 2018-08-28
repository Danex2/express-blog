import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../actions/posts";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class PostItem extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { data } = this.props;
    return (
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-lg-4 col-md-10 col-sm-10">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.text}</p>
                <Link to="/posts" className="btn btn-primary">
                  Back to posts
                </Link>
              </div>
              <div className="card-footer text-muted">
                <Moment fromNow ago>
                  {data.createdAt}
                </Moment>{" "}
                ago
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.posts.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(PostItem);
