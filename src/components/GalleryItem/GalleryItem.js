import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";

const GalleryItem = ({ name, svg, selected, onClick }) => {
  const [imageURI, setImageURI] = useState(undefined);

  useEffect(() => {
    if (svg) {
      const uri = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      setImageURI(uri);
    }
  }, [svg]);

  return (
    <div
      className={classNames("gallery-item", { "is-selected": selected })}
      onClick={onClick}
    >
      <div
        className={classNames("icon-container", {
          "show-icon": imageURI !== undefined,
        })}
      >
        <img src={imageURI} alt="icon" />
        {/* <span>{name}</span> */}
      </div>
    </div>
  );
};

const areEqual = (prevIcon, nextIcon) => {
  return prevIcon.name === nextIcon.name && prevIcon.svg === nextIcon.svg;
};

export const MemoGalleryItem = React.memo(GalleryItem);
