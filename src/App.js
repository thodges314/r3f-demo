import ThreePointViz from "./ThreePointViz/ThreePointViz";
import "./styles.css";

const data = new Array(1000).fill(0).map((_d, id) => ({
  id,
}));

export default function App() {
  return (
    <div className="App">
      <div className="vis-container">
        <ThreePointViz data={data} />
      </div>
    </div>
  );
}
