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
    console.log(renderIcons.length);
    let timer = null;
    if (renderIcons.length <= selectedIcons.length) {
      timer = setTimeout(function() {
        const index = renderIcons.length + 1;
        setRenderIcons([...renderIcons, selectedIcons[index]]);
      }, 1);
    } else {
      clearTimeout(timer);
    }
    // WHEN UNMOUNT
    return () => clearTimeout(timer);
  }, [renderIcons]);

  return (
    <section className="prd-gallery">
      {console.log("render")}
      <div className="gallery-scroll">
        <div className="icons-grid">
          {renderIcons.map((item, index) => {
            return <GalleryItem key={index} details={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({details = {}}) => {
  return (
    <div className="gallery-item">
      <img
        src={`data:image/svg+xml,${encodeURIComponent(details.svg)}`}
        alt="icon"
      />
      {/* <span>{details.name}</span> */}
    </div>
  );
};
