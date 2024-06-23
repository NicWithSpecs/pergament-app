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
      className={`node frame-node h-full w-full rounded-xl border border-zinc-300 bg-zinc-50 p-0 shadow duration-200 ease-in-out-bounce dark:border-zinc-700 dark:bg-zinc-800 ${
        selected || dragging ? "shadow-2xl" : ""
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
