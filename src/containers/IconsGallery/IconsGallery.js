import React, {useContext} from "react";
import {AppContext} from "../../hooks/useAppContext";
import DirTree from "../../components/DirTree";
import Gallery from "../../components/Gallery";
import Preview from "../../components/Preview";

export const IconsGallery = () => {
  const [state] = useContext(AppContext);
  return (
    <article className="prd-icons-gallery">
      <DirTree />
      <Gallery />
      <Preview />
    </article>
  );
};
