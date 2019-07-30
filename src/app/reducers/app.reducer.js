import {
  NAVIGATE,
  USER_CHANGE_THEME,
  APP_LAST_SEEN,
  RESET,
  VISIBILITY
} from "../constants";

const initialState = {
  theme: "light" // 'dark' or 'light'
};

// Non persisting reducer to store loading animation
function state(state = initialState, action) {
  switch (action.type) {
    case USER_CHANGE_THEME:
      return Object.assign({}, state, {
        theme: action.theme
      });
    case RESET:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

export default state;
