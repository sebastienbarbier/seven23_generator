import { combineReducers } from "redux";

import state from "./reducers/state.reducer";
import app from "./reducers/app.reducer";

const reducers = combineReducers({
  app,
  state
});

export default reducers;
