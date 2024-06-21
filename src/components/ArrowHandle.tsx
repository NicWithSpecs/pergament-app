import { Handle, Position } from "reactflow";

interface ArrowHandleProps {
  isConnecting: boolean;
  selected: boolean;
  dragging: boolean;
}

const arrowHandleStyle = {
  width: "15px",
  height: "15px",
  top: "-4px",
  right: "-4px",
  borderRadius: "50%",
  transform: "none",
};

const ArrowHandle = ({
  isConnecting,
  selected,
  dragging,
}: ArrowHandleProps) => {
  return (
    !isConnecting && (
      <Handle
        className={`bg-zinc-900 dark:bg-zinc-50  ${
          !selected || dragging ? "opacity-0" : ""
        }`}
        position={Position.Right}
        type="source"
        style={arrowHandleStyle}
      />
    )
  );
};

export default ArrowHandle;
