import { ConnectionLineComponentProps, getStraightPath } from "reactflow";

function CustomConnectionLine({
  fromNode,
  fromX,
  fromY,
  toX,
  toY,
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
        style={{ strokeWidth: 1 }}
        className="animated stroke-zinc-900 dark:stroke-zinc-100"
        fill="none"
        d={edgePath}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="black"
        r={2}
        strokeWidth={3}
        className="stroke-zinc-900 dark:stroke-zinc-100"
      />
    </g>
  );
}

export default CustomConnectionLine;
