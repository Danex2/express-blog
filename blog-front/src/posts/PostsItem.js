import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const PostsItem = ({ posts }) => {
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center mt-2">
        <div className="col-lg-4 col-md-10 col-sm-10">
          {posts.length === 0 ? (
            <div className="jumbotron jumbotron-fluid">
              <div className="container d-flex justify-content-center">
                <h1 className="display-4">No posts yet.</h1>
                <p className="lead">Click "Make a Post" to get started!</p>
              </div>
            </div>
          ) : (
            posts.map(post => {
              return (
                <div key={post.id} className="card text-center mt-2">
                  <div className="card-header">Posted by: {post.name}</div>
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text text-truncate">{post.text}</p>
                    <Link to={`/post/${post.id}`} className="btn btn-primary">
                      Link to full post
                    </Link>
                  </div>
                  <div className="card-footer text-muted">
                    <Moment fromNow ago>
                      {post.createdAt}
                    </Moment>{" "}
                    ago
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsItem;
