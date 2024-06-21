import { MdArrowCircleRight } from "react-icons/md";
import { Handle, Position } from "reactflow";

interface ArrowHandleProps {
  isConnecting: boolean;
  selected: boolean;
  dragging: boolean;
}

const arrowHandleStyle = {
  width: "20px",
  height: "20px",
  top: "-7px",
  right: "-7px",
  borderRadius: "50%",
  transform: "none",
  background: "none",
};

const ArrowHandle = ({
  isConnecting,
  selected,
  dragging,
}: ArrowHandleProps) => {
  return (
    !isConnecting && (
      <Handle
        className={`overflow-hidden ${
          !selected || dragging ? "opacity-0" : ""
        }`}
        position={Position.Right}
        type="source"
        style={arrowHandleStyle}
      >
        <MdArrowCircleRight className="bg-zinc-200 dark:bg-zinc-900 fill-zinc-900 dark:fill-zinc-200 w-full h-full m-auto pointer-events-none" />
      </Handle>
    )
  );
};

export default ArrowHandle;
