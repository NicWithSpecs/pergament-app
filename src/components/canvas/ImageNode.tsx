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
        className={`node image-node overflow-hidden rounded-xl border border-zinc-300 bg-zinc-50 p-0 shadow duration-100 ease-in-out-bounce dark:border-zinc-700 dark:bg-zinc-800 ${
          selected || dragging ? "shadow-3xl" : ""
        }`}
      >
        {!data.hasImage && (
          <button
            className="m-3 w-32"
            /* onClick={() => alert("An Image import modal should open now.")} */
          >
            <BiSolidImageAdd className="h-full w-full" />
          </button>
        )}
        {/* TODO replace this toolbar with a image import modal */}
        <NodeToolbar
          isVisible={data.forceToolbarVisible || undefined}
          position={data.toolbarPosition}
        >
          <form method="post" onSubmit={handleImageSubmit}>
            <input
              name="imageUrl"
              className="w-50 rounded p-1"
              placeholder="Paste link here..."
            ></input>
            <button
              type="submit"
              className="mx-2 rounded bg-white px-3 py-1 font-bold hover:text-blue-600"
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
              className="h-full w-full"
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
