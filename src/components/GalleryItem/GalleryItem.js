import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";

const GalleryItem = ({ name, svg, selected, onClick }) => {
  const [imageURI, setImageURI] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

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
          "show-icon": isLoaded,
        })}
      >
        <img src={imageURI} alt="icon" onLoad={() => setIsLoaded(true)} />
      </div>
      <span className="icon-name">{name}</span>
    </div>
  );
};

const areEqual = (prevIcon, nextIcon) => {
  return prevIcon.name === nextIcon.name && prevIcon.svg === nextIcon.svg;
};

export const MemoGalleryItem = React.memo(GalleryItem);
