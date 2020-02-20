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

// const renderTree = node => {
//   return (
//     <ul className="tree-list">
//       {node.map((item, i) => {
//         if (item.files) {
//           return (
//             <li key={i} className="tree-list-item">
//               <span>{item.name}</span>
//               {renderTree(item.files)}
//             </li>
//           );
//         }
//       })}
//     </ul>
//   );
// };

// export const DirTree = () => {
//   return (
//     <nav className="prd-dir-tree">
//       <div className="tree-container static-items">
//         <ul className="tree-list">
//           <li className="tree-list-item">All</li>
//           <li className="tree-list-item">Favorites</li>
//         </ul>
//       </div>
//       <div className="tree-container dynamic-items">{renderTree(data)}</div>
//     </nav>
//   );
// };

// {JSON.stringify(data, null, 2)}
