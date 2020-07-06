import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

export const GalleryItem = ({ name, size, svg, selected, onClick }) => {
  const [imageURI, setImageURI] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (svg) {
      const uri = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      setImageURI(uri);
    }
  }, [svg]);

  useEffect(() => {
    if (itemRef) {
      itemRef.current.style.width = size;
      itemRef.current.style.maxWidth = size;
    }
  }, [size]);

  return (
    <div
      className={classNames(
        "gallery-item",
        { "is-selected": isLoaded && selected },
        { "show-icon": isLoaded }
      )}
      onClick={onClick}
      ref={itemRef}
    >
      <div className="icon-container">
        <img src={imageURI} alt="icon" onLoad={() => setIsLoaded(true)} />
      </div>
      <span className="icon-name">{name}</span>
    </div>
  );
};

// const areEqual = (prevIcon, nextIcon) => {
//   return prevIcon.name === nextIcon.name && prevIcon.svg === nextIcon.svg;
// };

export const MemoGalleryItem = React.memo(GalleryItem);
