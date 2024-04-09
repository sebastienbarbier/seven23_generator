/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import moment from "moment";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles"; // v1.x
import MomentUtils from "@date-io/moment";

import Box from "@mui/material/Box";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";

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
  // Load theme to inject in MuiThemeProvider
  const theme = useTheme();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div id="appContainer">
          <div id="iPadBorder"></div>
          <Box sx={{ display: 'flex' }}>
            <AppBar>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Seven23 Generator
                </Typography>
              </Toolbar>
            </AppBar>
            <Container>
              <Generator />
              <SnackbarsManager />
            </Container>
          </Box>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};