import {
  Handle,
  NodeProps,
  NodeResizer,
  NodeToolbar,
  Position,
  ReactFlowState,
  useReactFlow,
  useStore,
} from "reactflow";
import { BiSolidImageAdd } from "react-icons/bi";

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

const ImageNode = ({ id, selected, data, dragging }: NodeProps) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;

  const reactFlow = useReactFlow();

  function handleImageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson.imageUrl);

    // TODO Check if link is valid image

    // update nodes
    const newNodes = reactFlow.getNodes().map((n) => ({
      ...n,
      data:
        n.id === id
          ? { ...n.data, hasImage: true, image: { url: formJson.imageUrl } }
          : n.data,
    }));
    reactFlow.setNodes(newNodes);
  }

  return (
    <>
      <div className="node image-node overflow-hidden">
        {!data.hasImage && (
          <button
            className="image-placeholder"
            /* onClick={() => alert("An Image import modul should open now.")} */
          >
            <BiSolidImageAdd />
          </button>
        )}
        <NodeToolbar
          isVisible={data.forceToolbarVisible || undefined}
          position={data.toolbarPosition}
        >
          <form method="post" onSubmit={handleImageSubmit}>
            <input
              name="imageUrl"
              className="w-50 p-1 rounded"
              placeholder="Paste link here..."
            ></input>
            <button
              type="submit"
              className="bg-white hover:text-blue-600 font-bold px-3 py-1 mx-2 rounded"
            >
              Add
            </button>
          </form>
        </NodeToolbar>

        {data.hasImage && (
          <>
            <NodeResizer
              minWidth={100}
              minHeight={100}
              keepAspectRatio={true}
              isVisible={selected}
            />
            <img
              className="w-full h-full"
              src={data.image.url}
              alt={data.image.alt}
            />
          </>
        )}
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
