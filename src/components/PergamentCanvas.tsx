import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import ReactFlow, {
  Node,
  Controls,
  Background,
  BackgroundVariant,
  SelectionMode,
  NodeTypes,
  ConnectionMode,
  EdgeTypes,
  StraightEdge,
  useReactFlow,
  ReactFlowInstance,
  OnInit,
} from "reactflow";

import "reactflow/dist/style.css";

import FloatingEdge, { ArrowTip } from "../components/FloatingEdge";
import CustomConnectionLine from "../components/CustomConnectionLine";
import NoteNode from "../components/NoteNode";
import ImageNode from "./ImageNode";
import FrameNode from "./FrameNode";
import HeadingNode from "./HeadingNode";
import usePergamentStore, { PergamentState } from "../store";
import PergamentToolbar from "./PergamentToolbar";
import TodoNode from "./TodoNode";
import {
  LuArchiveRestore,
  LuCheckSquare,
  LuHeading1,
  LuImage,
  LuPenSquare,
  LuSave,
  LuSquare,
} from "react-icons/lu";

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
    [setReactFlowInstance]
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
      style: { width: 400 },
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
      style: { width: 500, height: 500, zIndex: -1 },
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
      style: { width: 400 },
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
      <div className="w-screen h-full bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 overflow-hidden">
        <ReactFlow
          onInit={onInit}
          maxZoom={1.8}
          minZoom={1}
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
          fitViewOptions={{ padding: 4 }}
          selectionOnDrag
          panOnDrag={[1, 2]}
          selectionMode={SelectionMode.Partial}
          selectNodesOnDrag={false}
          connectionLineComponent={CustomConnectionLine}
          connectionMode={ConnectionMode.Loose}
          deleteKeyCode={"Delete"}
        >
          <Controls />
          <Background
            variant={BackgroundVariant.Dots}
            color="#909090"
            gap={15}
            size={1}
          />
          <PergamentToolbar noteFunctions={addNodeFunctions} />
        </ReactFlow>
        <button
          className="inline-flex items-center justify-center space-evenly whitespace-nowrap rounded-md text-sm font-medium bg-zinc-50 hover:bg-zinc-800 hover:text-zinc-100 border border-zinc-300 dark:bg-zinc-900 dark:text-zinc-200 shadow-lg fixed top-[70px] right-5 w-32 py-2 px-4"
          onClick={onSave}
        >
          <LuSave className="mr-2 h-4 w-4" />
          Save
        </button>
        <button
          className="inline-flex items-center justify-center space-evenly whitespace-nowrap rounded-md text-sm font-medium bg-zinc-50 hover:bg-zinc-800 hover:text-zinc-100 border border-zinc-300 dark:bg-zinc-900 dark:text-zinc-200 shadow-lg fixed top-[120px] right-5 w-32 py-2 px-4"
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
