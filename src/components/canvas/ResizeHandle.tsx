import { NodeResizeControl, ResizeControlVariant } from "reactflow";

interface ResizeHandleProps {
  selected: boolean;
  dragging: boolean;
}

const ResizeHandle = ({ selected, dragging }: ResizeHandleProps) => {
  return (
    <NodeResizeControl
      className={`${!selected || dragging ? "opacity-0" : ""}`}
      minWidth={150}
      minHeight={100}
      maxWidth={1600}
      variant={ResizeControlVariant.Line}
    >
      <ResizeIcon />
    </NodeResizeControl>
  );
};

function ResizeIcon() {
  return (
    <svg
      className="resize-icon fill-zinc-900 dark:fill-zinc-50"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
      height="11"
      fill="none"
    >
      <rect
        rx=".658"
        ry=".658"
        x="4.842"
        y="-1.62"
        transform="rotate(45 5.5 5.5)"
        width="1.316"
        height="14.24"
        className="fills"
      />
      <rect
        rx=".678"
        ry=".678"
        x="7.232"
        y="4.34"
        transform="rotate(45 7.91 7.91)"
        width="1.356"
        height="7.14"
        className="fills"
      />
    </svg>
  );
}

export default ResizeHandle;
