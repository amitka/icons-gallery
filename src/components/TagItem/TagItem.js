import React, { useState, useEffect } from "react";
import classNames from "classnames";

export const TagItem = ({ text = "", onTagEvent, selected }) => {
  const [val, setVal] = useState(text);
  const [wid, setWidth] = useState(0);
  const inputRef = React.useRef();
  const textRef = React.useRef();

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.clientWidth + 10);
    }
  }, [val]);

  React.useEffect(() => {
    if (selected) {
      inputRef.current.focus();
    }
  }, [selected]);

  const onTagClicked = e => {
    e.preventDefault();
    switch (e.target.id) {
      case "tag-item-input":
        return onTagEvent("set", val);
      case "tag-item-text":
        return onTagEvent("edit", val);
      case "del-btn":
        return onTagEvent("delete", val);
      default:
        return "";
    }
  };

  return (
    <div
      className={classNames("tag-item", { "is-editable": selected })}
      onMouseDown={!selected && onTagClicked}
    >
      <input
        id="tag-item-input"
        type="text"
        ref={inputRef}
        className="tag-item-input"
        style={selected ? { width: wid } : {}}
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyPress={e => {
          if (e.key === "Enter") {
            onTagClicked(e);
          }
        }}
      />
      <span id="tag-item-text" className="tag-item-text" ref={textRef}>
        {val}
      </span>
      <span id="del-btn" className="tag-item-del-btn">
        X
      </span>
    </div>
  );
};
