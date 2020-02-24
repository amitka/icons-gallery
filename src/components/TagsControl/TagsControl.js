import React, { useState, useRef, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import classNames from "classnames";

export const TagsControl = props => {
  const [{ iconToPreview, tags }] = React.useContext(AppContext);
  const [tagsToDisplay, setTagsToDisplay] = useState([]);
  const [editTag, setEditTag] = useState(true);
  const outsideRef = useRef();
  const { outside } = useOutsideAlerter(outsideRef);

  useEffect(() => {
    if (iconToPreview) {
      const result = tags.filter(tag => tag.name === iconToPreview.name);
      result[0] !== undefined
        ? setTagsToDisplay(result[0].tags)
        : setTagsToDisplay([]);
    }
  }, [iconToPreview]);

  useEffect(() => {
    // IF CLICK OUTSIDE
    // MAKE ALL TAGS UNEDITABLE
    if (outside) {
      setEditTag(false);
    } else {
      setEditTag(true);
    }
  }, [outside]);

  const onTagChange = data => {
    if (data) {
      const index = tagsToDisplay.indexOf(data.old);
      const newTags = [...tagsToDisplay];
      newTags[index] = data.new;
      setTagsToDisplay(newTags);
    }
  };

  return (
    <div className="tags-control" ref={outsideRef}>
      {tagsToDisplay.map((item, index) => (
        <TagItem
          key={index}
          text={item}
          onChange={onTagChange}
          editable={editTag}
        />
      ))}
    </div>
  );
};

const TagItem = ({ text, onChange, editable }) => {
  const [val, setVal] = useState(text);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    // IF CLICK OUTSIDE
    // MAKE ALL TAGS UNEDITABLE
    if (!editable) {
      setEditMode(false);
    }
  }, [editable]);

  useEffect(() => {
    // WHEN EDITING TAG
    // FOCUS ON IT
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const onTagClicked = e => {
    console.log(e.target.id);
    if (editMode === false) {
      setEditMode(true);
    }
  };

  const setNewTag = e => {
    if (e.key === "Enter") {
      const newTag = { old: text, new: val };
      // UPDATE TAG CONTROL ON CHANGE
      onChange(newTag);
      // TURN OFF EDIT
      setEditMode(false);
    }
  };

  return (
    <div
      id="tagItem"
      className={classNames("tag-item", { "is-editable": editMode })}
      onClick={e => onTagClicked(e)}
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
      <span className="tag-item-del-btn" id="delBtn">
        X
      </span>
    </div>
  );
};
