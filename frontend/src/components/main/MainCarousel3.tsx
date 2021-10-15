import React from "react";
import Tooltip from "@mui/material/Tooltip";
import "./MainCarousel.css";

function MainCarousel3(): JSX.Element {
  return (
    <div className="wrapper">
      <Tooltip title="HYUN-A click">
        <input type="checkbox" className="maincirclevideo" />
      </Tooltip>
      <div className="video">
        <video src="/videos/main_hyuna.mp4" loop muted autoPlay playsInline />
      </div>
      <div className="text">
        <span data-text="HYUN-A" />
      </div>
    </div>
  );
}

export default MainCarousel3;
