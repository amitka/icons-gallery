import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";

export const Gallery = () => {
  const [state, setState] = useContext(AppContext);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [renderIcons, setRenderIcons] = useState([]);

  useEffect(() => {
    if (state.selectedCategory !== "All") {
      let regex = new RegExp("\\\\" + state.selectedCategory + "\\\\", "g");
      const selected = state.icons.filter(item => item.key.match(regex));
      //
      setSelectedIcons([]);
      setSelectedIcons(selected);
      setRenderIcons([]);
    } else {
      setSelectedIcons(state.icons.slice(0, 100));
    }
  }, [state.icons, state.selectedCategory]);

  // useEffect(() => {
  //   if (selectedIcons.length > 0) {
  //     setRenderIcons([...renderIcons, selectedIcons[0]]);
  //   }
  // }, [selectedIcons]);

  // useEffect(() => {
  //   let timer = null;
  //   if (renderIcons.length < selectedIcons.length) {
  //     timer = setTimeout(function() {
  //       const index = renderIcons.length + 1;
  //       setRenderIcons(renderIcons => [...renderIcons, selectedIcons[index]]);
  //     }, 1);
  //   } else {
  //     clearTimeout(timer);
  //   }
  //   // WHEN UNMOUNT
  //   return () => clearTimeout(timer);
  // }, [renderIcons]);

  return (
    <section className="prd-gallery">
      <div className="gallery-scroll">
        <h4>{renderIcons.length}</h4>
        <div className="icons-grid">
          {selectedIcons.length &&
            selectedIcons.map((item = {}, index) => {
              return (
                <GalleryItem key={index} name={item.name} svg={item.svg} />
              );
            })}
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({ name, svg }) => {
  const [imageURI, setImageURI] = useState(undefined);

  useEffect(() => {
    if (svg) {
      const uri = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      setImageURI(uri);
    }
  }, [svg]);

  return (
    <div className="gallery-item">
      <div
        className={
          imageURI === undefined ? "icon-container" : "icon-container show-icon"
        }
      >
        <img src={imageURI} alt="icon" />
        {/* <span>{name}</span> */}
      </div>
    </div>
  );
};

const galleryItemAreEqual = (prevIcon, nextIcon) => {
  return prevIcon.name === nextIcon.name && prevIcon.svg === nextIcon.svg;
};

const MemoGalleryItem = React.memo(GalleryItem, galleryItemAreEqual);
