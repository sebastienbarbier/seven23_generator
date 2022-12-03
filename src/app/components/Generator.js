import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";

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
        paddingTop: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Button variant="contained" color="primary" onClick={() => generate()}>
        Generate and download data
      </Button>
      <a id="downloadAnchorElem"></a>
    </div>
  );
}
