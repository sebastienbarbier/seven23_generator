import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";

import { darktheme } from "./themes/dark";
import { lighttheme } from "./themes/light";

const useTheme = () => {
  const theme = useSelector(state =>
    state.user ? state.app.theme || "light" : "light"
  );

  const [muiTheme, setMuiTheme] = useState(() => lighttheme);
  useEffect(() => {
    const themeObject = createMuiTheme(
      theme === "dark" ? darktheme : lighttheme
    );

    // Default colors are the dashboard one
    themeObject.palette.primary = themeObject.palette.dashboard.primary;
    themeObject.palette.primary.main = themeObject.palette.dashboard.main;

    setMuiTheme(themeObject);

    // Edit CSS variables
    const css = document.documentElement.style;
    css.setProperty("--primary-color", themeObject.palette.primary.main);
    css.setProperty("--loading-color", themeObject.palette.divider);
    css.setProperty(
      "--background-color",
      themeObject.palette.background.default
    );
    css.setProperty("--divider-color", themeObject.palette.divider);
    css.setProperty("--text-color", themeObject.palette.text.primary);
    css.setProperty("--paper-color", themeObject.palette.background.paper);
    css.setProperty("--cardheader-color", themeObject.palette.cardheader);

    css.setProperty("--number-green-color", themeObject.palette.numbers.green);
    css.setProperty("--number-red-color", themeObject.palette.numbers.red);
    css.setProperty("--number-blue-color", themeObject.palette.numbers.blue);
  }, [theme]);

  return useMemo(() => createMuiTheme(muiTheme), [muiTheme]);
};

export { useTheme };
