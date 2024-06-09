import {
  Handle,
  NodeProps,
  NodeResizer,
  Position,
  ReactFlowState,
  useStore,
} from "reactflow";

const arrowHandleStyle: React.CSSProperties = {
  display: "block",
  width: 11,
  height: 11,
  top: -4,
  right: -4,
  position: "absolute",
  backgroundColor: "black",
  borderRadius: "50%",
  transform: "none",
  cursor: "crosshair",
  textAlign: "center",
  lineHeight: "9px",
  fontWeight: "bold",
};

const arrowTargetStyle: React.CSSProperties = {
  display: "block",
  top: 0,
  right: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "blue",
  border: "none",
  borderRadius: "0",
  transform: "none",
  opacity: 0,
  cursor: "crosshair",
};

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

const ImageNode = ({ selected, data, dragging }: NodeProps) => {
  /* const [editing, setEditing] = useState(false); */

  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;

  return (
    <>
      <div className="image-node overflow-hidden">
        <NodeResizer
          minWidth={30}
          minHeight={30}
          keepAspectRatio={true}
          isVisible={selected}
        />
        <img
          className="w-full h-full"
          src={data.image.url}
          alt={data.image.alt}
        />
        {!isConnecting && (
          <Handle
            className={`customHandle ${selected && !dragging ? "" : "hide"}`}
            position={Position.Right}
            type="source"
            style={arrowHandleStyle}
          />
        )}
        <Handle
          className="arrowTarget"
          position={Position.Left}
          type="target"
          style={arrowTargetStyle}
          isConnectableStart={!isConnecting ? false : true}
        />
      </div>
    </>
  );
};

export default ImageNode;
