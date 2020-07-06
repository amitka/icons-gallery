import React from "react";
import className from "classnames";

import "./SizeBtnControl.scss";

export const SizeBtnControl = ({ size, onClick }) => {
  return (
    <div className="size-btn-wrapper">
      <div
        id="btn-small"
        className={className("size-btn small", { selected: size === "5%" })}
        onClick={onClick}
      />
      <div
        id="btn-medium"
        className={className("size-btn medium", {
          selected: size === "10%",
        })}
        onClick={onClick}
      />
      <div
        id="btn-large"
        className={className("size-btn large", { selected: size === "20%" })}
        onClick={onClick}
      />
    </div>
  );
};
