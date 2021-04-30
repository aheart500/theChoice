import React from "react";
import "./style.css";
export const Loader = ({ style }) => {
  return (
    <div className="loader-container" style={style}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
