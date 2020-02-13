import React, { useContext } from "react";
import { AppContext } from "../../hooks/useAppContext";
import classNames from "classnames";

export const Preview = () => {
  const [{ selectedIcon }] = useContext(AppContext);

  return (
    <aside className="prd-preview">
      <div>Preview</div>
      <div
        className={classNames("icon-preview", {
          "show-preview":
            selectedIcon !== undefined && selectedIcon.svg !== undefined
        })}
      >
        <img
          src={
            selectedIcon !== undefined
              ? `data:image/svg+xml,${encodeURIComponent(selectedIcon.svg)}`
              : ""
          }
          alt="selected icon"
        />
        <span>{selectedIcon !== undefined ? selectedIcon.name : ""}</span>
      </div>
    </aside>
  );
};
