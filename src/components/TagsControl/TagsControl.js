import React, { useState, useRef, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";
import useOutsideClick from "../../hooks/useOutsideClick";
import TagItem from "../TagItem";

export const TagsControl = () => {
  const [{ iconToPreview, tags }, setAppState] = React.useContext(AppContext);
  const [tagsToDisplay, setTagsToDisplay] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const tagControlRef = useRef();

  useOutsideClick(tagControlRef, () => {
    // WHEN CLICK OUTSIDE
    // SWITCH ALL TAGS EDIT TO OFF
    setTagsToDisplay([...tagsToDisplay]);
  });

  useEffect(() => {
    if (iconToPreview) {
      const result = tags.filter(tag => tag.name === iconToPreview.name);
      result[0] !== undefined
        ? setTagsToDisplay(result[0].tags)
        : setTagsToDisplay([]);
    }
  }, [iconToPreview]);

  useEffect(() => {
    // UPDATE TAGS IN APP STATE
    tags.forEach(tag => {
      if (tag.name === iconToPreview.name) {
        tag.tags = tagsToDisplay;
      }
    });
    // WHEN TAGS TO DISPLAY UPDATE...
    tagsToDisplay.forEach((tag, index) => {
      if (tag === "") {
        // IF NEW TAG - SET EDIT INDEX TO IT
        setEditIndex(index);
      } else {
        // TRUN ALL TAGS EDIT OFF
        setEditIndex(-1);
      }
    });
  }, [tagsToDisplay]);

  const onTagEvent = (action, value) => {
    let currentTags = [...tagsToDisplay];
    const currentIndex = currentTags.indexOf(value);
    //
    switch (action) {
      case "new":
        console.log("new tag");
        return setTagsToDisplay([...tagsToDisplay, ""]);
      case "edit":
        console.log("edit tag");
        return setEditIndex(currentIndex);
      case "set":
        console.log("set tag");
        currentTags[editIndex] = value;
        return setTagsToDisplay(currentTags);
      case "delete":
        console.log("delete tag");
        currentTags.splice(currentIndex, 1);
        return setTagsToDisplay(currentTags);
      default:
        return "";
    }
  };

  return (
    <div className="tags-control" ref={tagControlRef}>
      {tagsToDisplay.map((tag, index) => (
        <TagItem
          key={`tag-${Math.floor(Math.random() * (100000 - 1) + 1)}`}
          text={tag}
          onTagEvent={onTagEvent}
          selected={index === editIndex}
        />
      ))}
      <div className="add-tag-btn" onClick={() => onTagEvent("new", "")}>
        Add tag...
      </div>
    </div>
  );
};
