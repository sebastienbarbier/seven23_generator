/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { HookedBrowserRouter } from "./router";
import moment from "moment";

import { MuiThemeProvider } from "@material-ui/core/styles"; // v1.x
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import SnackbarsManager from "./components/snackbars/SnackbarsManager";

// Component for router
import Generator from "./components/Generator";

import AppActions from "./actions/AppActions";

import { useTheme } from "./theme";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

import "./main.scss";

/**
 * Main component is our root component which handle most loading events
 * Only load once, and should in theory never unmount.
 */
export const Main = () => {
  const dispatch = useDispatch();

  //
  // Handle listenner to notify serviceworker onupdatefound event with a snackbar
  //

  useEffect(() => {
    // Connect with workbow to display snackbar when update is available.
    if (process.env.NODE_ENV != "development" && "serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", event => {
        if (event.data == "APP_UPDATE") {
          dispatch(AppActions.cacheDidUpdate());
        }
      });

      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .catch(registrationError => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }, []);

  // Load theme to inject in MuiThemeProvider
  const theme = useTheme();

  return (
    <HookedBrowserRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div id="appContainer">
            <div id="iPadBorder"></div>
            <div
              id="container"
              style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary
              }}
            >
              <div id="content">
                <div id="toolbar" className="hideMobile">
                  <div className="left"></div>
                  <div className="right"></div>
                </div>
                <main style={{ position: "relative", flexGrow: 1 }}>
                  <Generator />
                  <SnackbarsManager />
                </main>
              </div>
            </div>
          </div>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </HookedBrowserRouter>
  );
};
