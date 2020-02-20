import React, { useContext, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";
import DirTree from "../../components/DirTree";
import Gallery from "../../components/Gallery";
import Preview from "../../components/Preview";

export const IconsGallery = () => {
  const [appState, setAppState] = useContext(AppContext);

  useEffect(() => {
    // FETCHING ICONS
    const fetchIconsData = async () => {
      const response = await fetch("./icons.json");
      const json = await response.json();
      return json;
    };

    fetchIconsData()
      .then(data => {
        console.log("Icons data was loaded...");
        setAppState(appState => ({ ...appState, icons: data }));
      })
      .catch(err => console.log("Error fetching icons data...", err));

    // FETCHING TAGS
    const fetchTagsData = async () => {
      const respone = await fetch("./tags.json");
      const json = respone.json();
      return json;
    };

    fetchTagsData()
      .then(data => {
        console.log("Tags were loaded ...");
        setAppState(appState => ({ ...appState, tags: data }));
      })
      .catch(err => console.log("Error fetching tags data ...", err));
  }, []);

  return (
    <article className="prd-icons-gallery">
      <DirTree />
      <Gallery />
      <Preview />
    </article>
  );
};
