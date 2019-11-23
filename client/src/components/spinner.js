import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Spinner() {
  return (
    <div>
      <div className="bgover">
        <p></p>
      </div>
      <CircularProgress
        className="mainspinier"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%"
        }}
      />
    </div>
  );
}
