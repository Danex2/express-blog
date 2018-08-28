import React, { Component } from "react";
import "./css/App.css";
import Navbar from "./Layout/Navbar";
import Login from "./authenticate/Login";
import Footer from "./Layout/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./authenticate/Register";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../src/actions/auth";
import store from "../src/store";
import { clearCurrentProfile } from "../src/actions/auth";
import Posts from "../src/posts/Posts";
import Post from "../src/posts/Post";
import PrivateRoute from "../src/authenticate/PrivateRoute";
import PostItem from "../src/posts/PostItem";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="h-75">
          <Navbar />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/posts" component={Posts} />
          <Switch>
            <PrivateRoute exact path="/post" component={Post} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/post/:id" component={PostItem} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
