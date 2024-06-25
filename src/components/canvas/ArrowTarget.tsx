import { Handle, Position } from "reactflow";

interface ArrowTargetProps {
  isConnecting: boolean;
}

const arrowTargetStyle: React.CSSProperties = {
  display: "block",
  top: 0,
  right: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "blue",
  border: "none",
  borderRadius: "0",
  transform: "none",
  opacity: 0,
  cursor: "crosshair",
};

const ArrowTarget = ({ isConnecting }: ArrowTargetProps) => {
  return (
    <Handle
      position={Position.Left}
      type="target"
      isConnectableStart={!isConnecting ? false : true}
      style={arrowTargetStyle}
    />
  );
};

export default ArrowTarget;
