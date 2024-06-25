import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  EdgeTypes,
  Node,
  NodeTypes,
  OnInit,
  ReactFlowInstance,
  SelectionMode,
  StraightEdge,
  useReactFlow,
} from "reactflow";
import {
  LuArchiveRestore,
  LuCheckSquare,
  LuHeading1,
  LuImage,
  LuPenSquare,
  LuSave,
  LuSquare,
} from "react-icons/lu";
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
  const { setNodes, setEdges } = usePergamentStore();
  const { screenToFlowPosition, setViewport } = useReactFlow();

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

  const addNoteNode = () => {
    const newNode: Node = {
      id: "note-" + self.crypto.randomUUID(),
      type: "noteNode",
      position: screenToFlowPosition({ x: 300, y: 300 }),
      data: { content: `` },
      style: { width: 405 },
      parentId: "",
    };

    setNodes(nodes.concat(newNode));
  };

  const addImageNode = () => {
    const newNode: Node = {
      id: "image-" + self.crypto.randomUUID(),
      type: "imageNode",
      position: screenToFlowPosition({ x: 300, y: 300 }),
      data: {
        hasImage: false,
        image: {
          url: "",
        },
      },
      parentId: "",
    };

    setNodes(nodes.concat(newNode));
  };

  const addFrameNode = () => {
    const newNode: Node = {
      id: "frame-" + self.crypto.randomUUID(),
      type: "frameNode",
      position: screenToFlowPosition({ x: 300, y: 300 }),
      data: {},
      style: { width: 510, height: 510, zIndex: -1 },
      parentId: "",
    };

    setNodes([newNode].concat(nodes));
  };

  const addHeadingNode = () => {
    const newNode: Node = {
      id: "heading-" + self.crypto.randomUUID(),
      type: "headingNode",
      position: screenToFlowPosition({ x: 300, y: 300 }),
      data: { content: `` },
      style: { width: 300 },
      parentId: "",
    };

    setNodes(nodes.concat(newNode));
  };

  const addTodoNode = () => {
    const newNode: Node = {
      id: "todo-" + self.crypto.randomUUID(),
      type: "todoNode",
      position: screenToFlowPosition({ x: 300, y: 300 }),
      data: { content: "" },
      style: { width: 405 },
      parentId: "",
    };
    setNodes(nodes.concat(newNode));
  };

  const addNodeFunctions = [
    {
      name: "Note",
      createFunction: addNoteNode,
      icon: LuPenSquare,
    },
    {
      name: "Frame",
      createFunction: addFrameNode,
      icon: LuSquare,
    },
    {
      name: "Heading",
      createFunction: addHeadingNode,
      icon: LuHeading1,
    },
    {
      name: "Image",
      createFunction: addImageNode,
      icon: LuImage,
    },
    {
      name: "Todo",
      createFunction: addTodoNode,
      icon: LuCheckSquare,
    },
  ];

  return (
    <>
      <ArrowTip />
      <div className="h-full w-screen overflow-hidden bg-zinc-200 text-zinc-900 transition-colors duration-500 dark:bg-zinc-900 dark:text-zinc-200">
        <ReactFlow
          onInit={onInit}
          snapToGrid={true}
          snapGrid={[15, 15]}
          maxZoom={2}
          minZoom={0.6}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          nodeDragThreshold={5}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          elementsSelectable={true}
          proOptions={{ hideAttribution: false }}
          fitView
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
          <PergamentToolbar noteFunctions={addNodeFunctions} />
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