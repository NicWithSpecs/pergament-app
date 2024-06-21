import "reactflow/dist/style.css";
import "../styles/App.css";
import PergamentCanvas from "../components/PergamentCanvas";
import { ReactFlowProvider } from "reactflow";
import PergamentHeader from "../components/PergamentHeader";
import usePergamentStore from "../store";

const PergamentApp = () => {
  const { darkMode } = usePergamentStore();

  return (
    <div className={`flex flex-col w-screen h-screen  ${darkMode && "dark"}`}>
      <PergamentHeader />
      <ReactFlowProvider>
        <PergamentCanvas />
      </ReactFlowProvider>
    </div>
  );
};

export default PergamentApp;
