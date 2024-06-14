import { Handle, Position } from "reactflow";

interface ArrowHandleProps {
  isConnecting: boolean;
  selected: boolean;
  dragging: boolean;
}

const ArrowHandle = ({
  isConnecting,
  selected,
  dragging,
}: ArrowHandleProps) => {
  return (
    !isConnecting && (
      <Handle
        className={`arrow-handle ${selected && !dragging ? "" : "hide"}`}
        position={Position.Right}
        type="source"
      />
    )
  );
};

export default ArrowHandle;
