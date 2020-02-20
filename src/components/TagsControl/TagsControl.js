import React, { useState, useRef, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";
import classNames from "classnames";

export const TagsControl = () => {
  const [{ iconToPreview, tags }] = React.useContext(AppContext);
  const [tagsToDisplay, setTagsToDisplay] = useState([]);

  useEffect(() => {
    if (iconToPreview) {
      const result = tags.filter(tag => tag.name === iconToPreview.name);
      result[0] !== undefined
        ? setTagsToDisplay(result[0].tags)
        : setTagsToDisplay([]);
    }
  }, [iconToPreview]);

  useEffect(() => {}, [tagsToDisplay]);

  const onTagChange = data => {
    const index = tagsToDisplay.indexOf(data.old);
    const newTags = [...tagsToDisplay];
    newTags[index] = data.new;
    setTagsToDisplay(newTags);
  };

  return (
    <div className="tags-control">
      {tagsToDisplay.map((item, index) => (
        <TagItem key={index} text={item} onChange={onTagChange} />
      ))}
    </div>
  );
};

const TagItem = ({ text, onChange }) => {
  const [val, setVal] = useState(text);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const editTag = () => {
    console.log("click");
    if (editMode === false) {
      setEditMode(true);
    }
  };

  const setNewTag = e => {
    if (e.key === "Enter") {
      // TODO: SET NEW TAG
      const newTag = { old: text, new: val };
      onChange(newTag);
      //
      setEditMode(false);
    }
  };

  return (
    <div
      className={classNames("tag-item", { "is-editable": editMode })}
      onClick={() => editTag()}
    >
      <input
        type="text"
        className="tag-item-input"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyPress={e => setNewTag(e)}
        ref={inputRef}
      />
      <span className="tag-item-text">{text}</span>
      <span className="tag-item-del-btn">X</span>
    </div>
  );
};
