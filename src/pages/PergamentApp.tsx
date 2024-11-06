import { ReactFlowProvider } from "reactflow";
import usePergamentStore from "../store";
import PergamentCanvas from "../components/canvas/PergamentCanvas";
import PergamentHeader from "../components/PergamentHeader";
import "reactflow/dist/style.css";
import "../styles/App.css";
import WipDisclaimer from "../components/WipDisclaimer";

const PergamentApp = () => {
  const { darkMode } = usePergamentStore();

  return (
    <div className={`flex h-screen w-screen flex-col ${darkMode && "dark"}`}>
      <WipDisclaimer />
      <PergamentHeader />
      <ReactFlowProvider>
        <PergamentCanvas />
      </ReactFlowProvider>
    </div>
  );
};

export default PergamentApp;
