import { ConnectionLineComponentProps, getStraightPath } from "reactflow";

function CustomConnectionLine({
  fromNode,
  fromX,
  fromY,
  toX,
  toY,
  connectionLineStyle,
}: ConnectionLineComponentProps) {
  if (!fromNode) {
    return null;
  }

  const fromNodeWidth = fromNode.width ?? 0;
  const fromNodeHeight = fromNode.height ?? 0;

  const [edgePath] = getStraightPath({
    sourceX: fromX - fromNodeWidth / 2,
    sourceY: fromY + fromNodeHeight / 2,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g>
      <path
        style={connectionLineStyle}
        className="animated"
        fill="none"
        d={edgePath}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="black"
        r={2}
        stroke="black"
        strokeWidth={3}
      />
    </g>
  );
}

export default CustomConnectionLine;
