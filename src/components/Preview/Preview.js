import React, { useContext } from "react";
import { AppContext } from "../../hooks/useAppContext";

import TagsControl from "../../components/TagsControl";
import classNames from "classnames";

export const Preview = () => {
  const [{ iconToPreview }] = useContext(AppContext);

  return (
    <aside className="prd-preview">
      <div>Preview</div>
      <div
        className={classNames("icon-preview", {
          "show-preview":
            iconToPreview !== undefined && iconToPreview.svg !== undefined
        })}
      >
        <img
          src={
            iconToPreview !== undefined
              ? `data:image/svg+xml,${encodeURIComponent(iconToPreview.svg)}`
              : ""
          }
          alt="selected icon"
        />
        <span>{iconToPreview !== undefined ? iconToPreview.name : ""}</span>
      </div>
      <TagsControl />
    </aside>
  );
};
