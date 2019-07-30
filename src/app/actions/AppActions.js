import { SNACKBAR, SNACKBAR_POP, CACHE_DID_UPDATE, RESET } from "../constants";

import moment from "moment";

import Worker from "../workers/App.worker";
const worker = new Worker();

var AppActions = {
  generate: () => {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        worker.onmessage = function(event) {
          resolve(event.data);
        };
        worker.onerror = function(exception) {
          reject(exception);
        };
        worker.postMessage({
          dateBegin: moment()
            .subtract(1, "year")
            .toDate(),
          dateEnd: moment().toDate()
        });
      });
    };
  },
  cacheDidUpdate: () => {
    return (dispatch, getState) => {
      if (!getState().state.cacheDidUpdate) {
        dispatch({
          type: CACHE_DID_UPDATE
        });
        dispatch(
          AppActions.snackbar(
            "🔥 An update has just been installed and is now available on your device.",
            "Restart to update",
            () => {
              window.location.reload();
            }
          )
        );
      }
    };
  },
  snackbar: (message, buttonLabel = null, onClick = null) => {
    return {
      type: SNACKBAR,
      snackbar: {
        message,
        buttonLabel,
        onClick
      }
    };
  },
  removeReadSnackbar: message => {
    return {
      type: SNACKBAR_POP
    };
  },
  reset: _ => {
    return (dispatch, getState) => {
      dispatch({
        type: RESET
      });

      return Promise.resolve();
    };
  }
};

export default AppActions;
