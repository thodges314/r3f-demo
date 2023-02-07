import { useState } from "react";
import ThreePointViz from "./ThreePointViz/ThreePointViz";
import "./styles.css";

const data = new Array(1000).fill(0).map((_d, id) => ({
  id,
}));

export default function App() {
  const [layout, setLayout] = useState("grid");
  return (
    <div className="App">
      <div className="vis-container">
        <ThreePointViz data={data} layout={layout} />
      </div>
      <div className="controls">
        <button onClick={() => setLayout("grid")}>Grid</button>
        <button onClick={() => setLayout("spiral")}>Spiral</button>
      </div>
    </div>
  );
}
