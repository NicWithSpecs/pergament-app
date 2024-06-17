import { NodeProps, NodeResizer, ReactFlowState, useStore } from "reactflow";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

const FrameNode = ({ selected, dragging }: NodeProps) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;

  return (
    <div
      className={`node frame-node bg-gray-300 border-2 border-black rounded-xl p-0 ease-in-out-bounce duration-100 w-full h-full ${
        selected || dragging ? "shadow-3xl" : ""
      }`}
    >
      <NodeResizer minWidth={100} minHeight={100} isVisible={selected} />
      <ArrowHandle
        isConnecting={isConnecting}
        selected={selected}
        dragging={dragging}
      />
      <ArrowTarget isConnecting={isConnecting} />
    </div>
  );
};

export default FrameNode;
