import "reactflow/dist/style.css";
import "../styles/App.css";
import PergamentCanvas from "../components/PergamentCanvas";
import { ReactFlowProvider } from "reactflow";
import PergamentHeader from "../components/PergamentHeader";
import usePergamentStore from "../store";

const PergamentApp = () => {
  const { darkMode } = usePergamentStore();

  return (
    <div className={`flex h-screen w-screen flex-col ${darkMode && "dark"}`}>
      <PergamentHeader />
      <ReactFlowProvider>
        <PergamentCanvas />
      </ReactFlowProvider>
    </div>
  );
};

export default PergamentApp;
