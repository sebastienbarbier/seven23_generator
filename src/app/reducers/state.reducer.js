import { SNACKBAR, SNACKBAR_POP, CACHE_DID_UPDATE, RESET } from "../constants";

const initialState = {
  isSyncing: false,
  isLoading: false,
  isConnecting: false,
  isLogging: false,
  cacheDidUpdate: false,
  snackbars: [],
  popup: null
};

// Non persisting reducer to store loading animation
function state(state = initialState, action) {
  switch (action.type) {
    case CACHE_DID_UPDATE:
      return Object.assign({}, state, {
        cacheDidUpdate: true
      });
    case SNACKBAR: {
      const res = Object.assign({}, state);
      res.snackbars = state.snackbars.map(a => ({ ...a }));
      res.snackbars.push(action.snackbar);
      return res;
    }
    case SNACKBAR_POP: {
      const res = Object.assign({}, state);
      res.snackbars = state.snackbars.map(a => ({ ...a }));
      res.snackbars.pop();
      return res;
    }
    case RESET:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

export default state;
