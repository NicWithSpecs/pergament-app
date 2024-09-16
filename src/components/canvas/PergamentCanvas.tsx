import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  EdgeTypes,
  NodeTypes,
  OnInit,
  ReactFlowInstance,
  SelectionMode,
  StraightEdge,
  useReactFlow,
} from "reactflow";
import { LuArchiveRestore, LuSave } from "react-icons/lu";
import usePergamentStore, { PergamentState } from "../../store";
import FloatingEdge, { ArrowTip } from "./FloatingEdge";
import CustomConnectionLine from "./CustomConnectionLine";
import NoteNode from "./NoteNode";
import ImageNode from "./ImageNode";
import FrameNode from "./FrameNode";
import HeadingNode from "./HeadingNode";
import PergamentToolbar from "./PergamentToolbar";
import TodoNode from "./TodoNode";
import "reactflow/dist/style.css";

const selector = (state: PergamentState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onNodeDrag: state.onNodeDrag,
  onNodeDragStop: state.onNodeDragStop,
  reactFlowInstance: state.reactFlowInstance,
  reactFlowKey: state.reactFlowKey,
  setReactFlowInstance: state.setReactFlowInstance,
});

const nodeTypes: NodeTypes = {
  noteNode: NoteNode,
  imageNode: ImageNode,
  frameNode: FrameNode,
  headingNode: HeadingNode,
  todoNode: TodoNode,
};
const edgeTypes: EdgeTypes = {
  floating: FloatingEdge,
  straight: StraightEdge,
};

const defaultEdgeOptions = {
  type: "floating",
  markerEnd: "arrow-tip",
  data: { label: " " },
  className: "stroke-zinc-900 dark:stroke-zinc-200",
};

const PergamentCanvas = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDrag,
    onNodeDragStop,
    reactFlowInstance,
    reactFlowKey,
    setReactFlowInstance,
  } = usePergamentStore(useShallow(selector));
  const { setNodes, addNote, setEdges } = usePergamentStore();
  const { setViewport } = useReactFlow();

  const onInit: OnInit = useCallback(
    (reactFlowInstance: ReactFlowInstance) => {
      setReactFlowInstance(reactFlowInstance);
    },
    [setReactFlowInstance],
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(reactFlowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance, reactFlowKey]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(reactFlowKey) || "{}");

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport, reactFlowKey]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer != undefined) event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type: string | undefined = event.dataTransfer?.getData(
        "application/pergament",
      );

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNote(type, position);
    },
    [addNote, reactFlowInstance],
  );

  return (
    <>
      <ArrowTip />
      <div className="h-full w-screen overflow-hidden bg-zinc-200 text-zinc-900 transition-colors duration-500 dark:bg-zinc-900 dark:text-zinc-200">
        <ReactFlow
          onInit={onInit}
          maxZoom={2}
          minZoom={0.6}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeDragThreshold={5}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          elementsSelectable={true}
          proOptions={{ hideAttribution: false }}
          fitView={false}
          fitViewOptions={{ padding: 6 }}
          selectionOnDrag
          panOnDrag={[1, 2]}
          selectionMode={SelectionMode.Partial}
          selectNodesOnDrag={false}
          connectionLineComponent={CustomConnectionLine}
          connectionMode={ConnectionMode.Loose}
          deleteKeyCode={"Delete"}
        >
          <Controls className="*:rounded-lg *:border *:border-solid *:border-zinc-400 *:shadow-md dark:*:border-zinc-600 dark:*:bg-zinc-800 dark:*:fill-zinc-200 dark:*:stroke-zinc-200 dark:hover:*:bg-zinc-600" />
          <Background
            variant={BackgroundVariant.Dots}
            color="#909090"
            gap={15}
            size={1}
          />
          {nodes.length <= 0 && (
            <div className="pointer-events-none fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
              <div className="m-auto text-center text-2xl">
                Drag some nodes from the left on here
              </div>
            </div>
          )}
          <PergamentToolbar />
        </ReactFlow>
        <button
          className="space-evenly fixed right-5 top-[70px] inline-flex w-32 items-center justify-center whitespace-nowrap rounded-md border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium shadow-lg hover:bg-zinc-800 hover:text-zinc-100 dark:bg-zinc-900 dark:text-zinc-200"
          onClick={onSave}
        >
          <LuSave className="mr-2 h-4 w-4" />
          Save
        </button>
        <button
          className="space-evenly fixed right-5 top-[120px] inline-flex w-32 items-center justify-center whitespace-nowrap rounded-md border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium shadow-lg hover:bg-zinc-800 hover:text-zinc-100 dark:bg-zinc-900 dark:text-zinc-200"
          onClick={onRestore}
        >
          <LuArchiveRestore className="mr-2 h-4 w-4" />
          Restore
        </button>
      </div>
    </>
  );
};

export default PergamentCanvas;
