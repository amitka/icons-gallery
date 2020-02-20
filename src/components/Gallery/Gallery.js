import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";
import { MemoGalleryItem } from "../GalleryItem";
import classNames from "classnames";

const MAX_ICONS_TO_DISPLAY = 200;

export const Gallery = () => {
  const [appState, setAppState] = useContext(AppContext);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [renderIcons, setRenderIcons] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");
  const [maxCount, setMaxCount] = useState(MAX_ICONS_TO_DISPLAY);

  useEffect(() => {
    setSelectedIcons([]);
    setRenderIcons([]);
    setSelectedIndex(0);
    setMaxCount(MAX_ICONS_TO_DISPLAY);
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
        setSelectedIcons(appState.icons);
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
      iconToPreview: renderIcons[0]
    }));
  }, [renderIcons]);

  // WHENEVER GALLERY SELECTED INDEX IS CHANGED
  // UPDATE APP STATE WITH SELECTED ICON
  useEffect(() => {
    setAppState(appState => ({
      ...appState,
      iconToPreview: renderIcons[selectedIndex]
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
          {renderIcons.slice(0, maxCount).map((item = {}, index) => (
            <MemoGalleryItem
              key={index}
              name={item.name}
              svg={item.svg}
              selected={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
        <div
          className={classNames("show-more", {
            "is-visible": renderIcons.length > MAX_ICONS_TO_DISPLAY
          })}
        >
          <span>Showing 1 / {maxCount + 1}</span>
          <button
            onClick={() => {
              if (maxCount + 100 < renderIcons.length) {
                setMaxCount(maxCount => maxCount + MAX_ICONS_TO_DISPLAY);
              } else {
                const delta = renderIcons.length - maxCount;
                setMaxCount(maxCount => maxCount + delta);
              }
            }}
          >
            Load more
          </button>
        </div>
      </div>
    </section>
  );
};
