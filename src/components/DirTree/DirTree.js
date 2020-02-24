import React, { useContext } from "react";
import { AppContext } from "../../hooks/useAppContext";
import classNames from "classnames";

export const DirTree = () => {
  const [appState, setAppState] = useContext(AppContext);

  return (
    <nav className="prd-dir-tree">
      <ul className="categories-list">
        {appState.categories.map((item, index) => {
          return (
            <li
              key={index}
              className={classNames("category-item", {
                "is-selected": item === appState.selectedCategory
              })}
              onClick={() => {
                setAppState({ ...appState, selectedCategory: item });
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// {JSON.stringify(data, null, 2)}
