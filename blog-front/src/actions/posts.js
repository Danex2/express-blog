import axios from "axios";

export const getPosts = () => dispatch => {
  axios.get("/api/posts/all").then(res =>
    dispatch({
      type: "GET_POSTS",
      payload: res.data
    })
  );
};

export const getPost = id => dispatch => {
  axios.get(`/api/posts/post/${id}`).then(res =>
    dispatch({
      type: "GET_POST",
      payload: res.data
    })
  );
};

export const addPost = postData => dispatch => {
  axios
    .post("/api/posts/post", postData)
    .then(res =>
      dispatch({
        type: "ADD_POST",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
