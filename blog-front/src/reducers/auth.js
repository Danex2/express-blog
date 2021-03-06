import isEmpty from "../utils/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "CLEAR_CURRENT_PROFILE":
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
}
