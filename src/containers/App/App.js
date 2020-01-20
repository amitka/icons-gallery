import React, {useContext} from "react";
import {AppContext} from "../../hooks/useAppContext";
import IconGallery from "../IconsGallery";

//import data from "../../assets/icons.json";

const App = () => {
  const [state] = useContext(AppContext);
  return (
    <main className="App">
      <IconGallery />
    </main>
  );
};

// const style = {
//   display: "flex",
//   flexFlow: "row wrap"
// };

// const divStyle = {
//   margin: "10px",
//   backgroundColor: "#dfdfdf"
// };

// function App() {
//   return (
//     <main className="App">
//       <h1>SVG Test </h1>
//       <h4>Found {data.length} icons</h4>
//       <div style={style}>
//         {data.map((item, index) => (
//           <div
//             key={index}
//             dangerouslySetInnerHTML={{ __html: item.svg }}
//             style={divStyle}
//           />
//         ))}
//         {
//           <div
//             dangerouslySetInnerHTML={{ __html: data[111].svg }}
//             style={divStyle}
//           />
//         }
//       </div>
//     </main>
//   );
// }

export default App;
