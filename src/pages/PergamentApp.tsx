import "reactflow/dist/style.css";
import "../styles/App.css";
import PergamentCanvas from "../components/PergamentCanvas";
import { ReactFlowProvider } from "reactflow";
import PergamentHeader from "../components/PergamentHeader";

const PergamentApp = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <PergamentHeader />
      <ReactFlowProvider>
        <PergamentCanvas />
      </ReactFlowProvider>
    </div>
  );
};

export default PergamentApp;
