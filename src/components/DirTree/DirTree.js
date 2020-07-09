import React, { useContext, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";
import classNames from "classnames";

export const DirTree = () => {
  const [appState, setAppState] = useContext(AppContext);

  // EACH TIME ICONS DATA CHANGE
  // REMAP CATEGORIES
  useEffect(() => {
    if (appState.icons.length > 0) {
      const rootFolders = [
        ...new Set(
          appState.icons.map((item) =>
            item.path.substring(0, item.path.substring(1).indexOf("/") + 1)
          )
        ),
      ];

      setAppState((appState) => ({
        ...appState,
        categories: [...appState.categories, ...rootFolders],
      }));
      console.log("Categories were set...");
    }
  }, [appState.icons]);

  return (
    <nav className="prd-dir-tree">
      <ul className="categories-list">
        {appState.categories.map((item, index) => {
          return (
            <li
              key={index}
              className={classNames("category-item", {
                "is-selected": item === appState.selectedCategory,
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
