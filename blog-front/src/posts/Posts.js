import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../actions/posts";
import PostsItem from "./PostsItem";

class Posts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts } = this.props.data;
    return <PostsItem posts={posts} />;
  }
}

const mapStateToProps = state => ({
  data: state.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
