import {
  NodeProps,
  NodeResizer,
  NodeToolbar,
  ReactFlowState,
  useReactFlow,
  useStore,
} from "reactflow";
import { BiSolidImageAdd } from "react-icons/bi";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";

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
      <div
        className={`node image-node overflow-hidden border-4 border-black rounded-xl p-0 ease-in-out-bounce duration-100 ${
          selected || dragging ? "shadow-3xl" : ""
        }`}
      >
        {!data.hasImage && (
          <button
            className="w-32 m-3"
            /* onClick={() => alert("An Image import modal should open now.")} */
          >
            <BiSolidImageAdd className="w-full h-full" />
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
        <ArrowHandle
          isConnecting={isConnecting}
          selected={selected}
          dragging={dragging}
        />
        <ArrowTarget isConnecting={isConnecting} />
      </div>
    </>
  );
};

export default ImageNode;
