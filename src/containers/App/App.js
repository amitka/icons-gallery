import React, { useContext } from "react";
import { AppContext } from "../../hooks/useAppContext";
import { SvgIcon } from "../../components/SvgIcon";
import "./App.css";

import data from "../../assets/icons.json";

const style = {
  display: "flex",
  flexFlow: "row wrap"
};

const divStyle = {
  //width: "100px",
  //height: "100px",
  margin: "10px",
  backgroundColor: "#dfdfdf"
};

const App = () => {
  const [state] = useContext(AppContext);
  return (
    <main>
      <h1>SVG Test </h1>
      <h4>Found {data.length} icons</h4>
      <h4>{state.message || "no data"}</h4>
      <SvgIcon />
    </main>
  );
};

// function App() {
//   return (
//     <AppContextProvider>
//       <main className="App">
//         <h1>SVG Test </h1>
//         <h4>Found {data.length} icons</h4>
//         <div style={style}>
//           {data.map((item, index) => (
//           <div
//             key={index}
//             dangerouslySetInnerHTML={{ __html: item.svg }}
//             style={divStyle}
//           />
//         ))}
//           {
//           <div
//             dangerouslySetInnerHTML={{ __html: data[111].svg }}
//             style={divStyle}
//           />
//         }
//         </div>
//       </main>
//     </AppContextProvider>
//   );
// }

export default App;
