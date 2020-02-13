import React, { useContext } from "react";
import { AppContext } from "../../hooks/useAppContext";

export const DirTree = () => {
  const [appState, setAppState] = useContext(AppContext);

  return (
    <nav className="prd-dir-tree">
      {console.log("dir tree render..")}
      <ul className="categories-list">
        <li
          className="category-item"
          onClick={() => {
            setAppState({ ...appState, selectedCategory: "All" });
          }}
        >
          All
        </li>
        {appState.categories.map((item, index) => {
          return (
            <li key={index} className="category-item" onClick={() => {}}>
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
