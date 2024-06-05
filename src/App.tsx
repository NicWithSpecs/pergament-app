import "reactflow/dist/style.css";
import "./styles/App.css";
import PergamentCanvas from "./components/PergamentCanvas";
import { ReactFlowProvider } from "reactflow";

export default function App() {
  return (
    <ReactFlowProvider>
      <PergamentCanvas />
    </ReactFlowProvider>
  );
}
