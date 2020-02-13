import React, { useState, useContext, useEffect, useMemo } from "react";
import { AppContext } from "../../hooks/useAppContext";
import { MemoGalleryItem } from "../GalleryItem";
//import classNames from "classnames";

export const Gallery = () => {
  const [appState, setAppState] = useContext(AppContext);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [renderIcons, setRenderIcons] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    setSelectedIcons([]);
    setRenderIcons([]);
    setSelectedIndex(0);
  }, [appState.icons, appState.selectedCategory]);

  // PLACE SELECTED CATEGORY INTO SELECTED ICONS
  // WHEN DONE COPY TO RENDER ICONS TO RENDER THEM
  useEffect(() => {
    if (selectedIcons.length === 0) {
      if (appState.selectedCategory !== "All") {
        let regex = new RegExp(
          "\\\\" + appState.selectedCategory + "\\\\",
          "g"
        );
        const selected = appState.icons.filter(item => item.key.match(regex));
        setSelectedIcons(selected);
      } else {
        setSelectedIcons(appState.icons.slice(0, 300));
      }
    } else {
      setRenderIcons(selectedIcons);
    }
  }, [selectedIcons]);

  // WHEN EVER RENDER ICONS ARE CHANGED
  // GALLERY SELECTED INDEX === 0
  // UPDATE APP STATE WITH SELECTED ICON
  useEffect(() => {
    setSelectedIndex(0);
    setAppState(appState => ({
      ...appState,
      selectedIcon: renderIcons[0]
    }));
  }, [renderIcons]);

  // WHENEVER GALLERY SELECTED INDEX IS CHANGED
  // UPDATE APP STATE WITH SELECTED ICON
  useEffect(() => {
    setAppState(appState => ({
      ...appState,
      selectedIcon: renderIcons[selectedIndex]
    }));
  }, [selectedIndex]);

  // FILTER RENDER ICONS WITH SEARCH PARAMS
  useEffect(() => {
    if (searchFilter !== "") {
      const filtered = selectedIcons.filter(icon =>
        icon.name.includes(searchFilter)
      );
      setRenderIcons(filtered);
    } else {
      setRenderIcons(selectedIcons);
    }
  }, [searchFilter]);

  return (
    <section className="prd-gallery">
      {console.log("gallery render...")}
      <div className="gallery-scroll">
        <div className="search-container">
          <input
            type="text"
            placeholder="search..."
            value={searchFilter}
            onChange={event => setSearchFilter(event.target.value)}
          />
          <span>{renderIcons.length}</span>
        </div>

        <div className="icons-grid">
          {renderIcons.map((item = {}, index) => (
            <MemoGalleryItem
              key={index}
              name={item.name}
              svg={item.svg}
              selected={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
