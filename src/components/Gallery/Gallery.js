import React, {useState, useContext, useEffect} from "react";
import {AppContext} from "../../hooks/useAppContext";

export const Gallery = () => {
  const [state, setState] = useContext(AppContext);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [renderIcons, setRenderIcons] = useState([]);

  useEffect(() => {
    if (state.selectedCategory !== "All") {
      let regex = new RegExp("\\\\" + state.selectedCategory + "\\\\", "g");
      const selected = state.icons.filter(item => item.key.match(regex));
      //
      setSelectedIcons(selected);
      setRenderIcons([]);
    } else {
      setSelectedIcons(state.icons);
    }
  }, [state.selectedCategory]);

  useEffect(() => {
    if (selectedIcons.length > 0) {
      setRenderIcons([...renderIcons, selectedIcons[0]]);
    }
  }, [selectedIcons]);

  useEffect(() => {
    let timer = null;
    if (renderIcons.length <= selectedIcons.length) {
      timer = setTimeout(function() {
        const index = renderIcons.length + 1;
        setRenderIcons(renderIcons => [...renderIcons, selectedIcons[index]]);
      }, 1);
    } else {
      clearTimeout(timer);
    }
    // WHEN UNMOUNT
    return () => clearTimeout(timer);
  }, [renderIcons]);

  return (
    <section className="prd-gallery">
      <div className="gallery-scroll">
        <h4>{renderIcons.length}</h4>
        <div className="icons-grid">
          {renderIcons.length &&
            renderIcons.map((item = {}, index) => {
              return (
                <MemoGalleryItem key={index} name={item.name} svg={item.svg} />
              );
            })}
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({name, svg}) => {
  const [imageURI, setImageURI] = useState("");

  useEffect(() => {
    setImageURI(`data:image/svg+xml,${encodeURIComponent(svg)}`);
    console.log(name);
  }, []);

  return (
    <div className="gallery-item">
      <img src={imageURI} alt="icon" />
      {/* <span>{details.name}</span> */}
    </div>
  );
};

// const galleryItemAreEqual = (prevIcon, nextIcon) => {
//   return prevIcon.name === nextIcon.name && prevIcon.svg === nextIcon.svg;
// };

const MemoGalleryItem = React.memo(GalleryItem);
