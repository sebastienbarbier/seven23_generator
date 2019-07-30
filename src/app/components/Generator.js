import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";

import AppActions from "../actions/AppActions";

export default function Generator() {
  const dispatch = useDispatch();

  const generate = (json = {}) => {
    dispatch(AppActions.generate()).then(json => {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(json));
      const dlElement = document.getElementById("downloadAnchorElem");
      const date = moment().format("YYYY-MM-DD HH_mm_ss");
      dlElement.setAttribute("href", dataStr);
      dlElement.setAttribute("download", `generator-${date}.json`);
      dlElement.click();
    });
  };

  return (
    <div
      style={{
        padding: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1>Seven23 Generator</h1>
      <Button variant="contained" color="primary" onClick={() => generate()}>
        Generate and download data
      </Button>
      <a id="downloadAnchorElem"></a>
    </div>
  );
}
