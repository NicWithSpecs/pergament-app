import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  SelectionMode,
  NodeTypes,
  MarkerType,
  ConnectionMode,
  EdgeTypes,
  StraightEdge,
  useReactFlow,
  ReactFlowInstance,
  OnInit,
} from "reactflow";

import "reactflow/dist/style.css";

import FloatingEdge from "../components/FloatingEdge";
import CustomConnectionLine from "../components/CustomConnectionLine";
import NoteNode from "../components/NoteNode";
import ImageNode from "./ImageNode";
import FrameNode from "./FrameNode";
import HeadingNode from "./HeadingNode";
import usePergamentStore, { PergamentState } from "../store";
import PergamentToolbar from "./PergamentToolbar";
import { FaBorderAll, FaHeading, FaImage, FaStickyNote } from "react-icons/fa";

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
};
const edgeTypes: EdgeTypes = {
  floating: FloatingEdge,
  straight: StraightEdge,
};

const defaultEdgeOptions = {
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
  data: { label: " " },
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
    const newNode = {
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
    const newNode = {
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
    const newNode = {
      id: "frame-" + self.crypto.randomUUID(),
      type: "frameNode",
      position: screenToFlowPosition({ x: 300, y: 300 }),
      data: {},
      style: { width: 500, height: 500, zIndex: -1 },
      parentId: "",
    };

    setNodes(nodes.concat(newNode));
  };

  const addHeadingNode = () => {
    const newNode = {
      id: "heading-" + self.crypto.randomUUID(),
      type: "headingNode",
      position: screenToFlowPosition({ x: 300, y: 300 }),
      data: { content: `` },
      style: { width: 300 },
      parentId: "",
    };

    setNodes(nodes.concat(newNode));
  };

  const addNodeFunctions = [
    {
      name: "Note",
      createFunction: addNoteNode,
      icon: FaStickyNote,
    },
    {
      name: "Frame",
      createFunction: addFrameNode,
      icon: FaBorderAll,
    },
    {
      name: "Heading",
      createFunction: addHeadingNode,
      icon: FaHeading,
    },
    {
      name: "Image",
      createFunction: addImageNode,
      icon: FaImage,
    },
  ];

  return (
    <div className="w-screen h-full bg-gray-200 overflow-hidden">
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
        className="bg-white text-black hover:bg-black hover:text-white border-2 border-black fixed top-20 right-5 py-2 px-4 rounded-xl"
        onClick={onSave}
      >
        Save
      </button>
      <button
        className="bg-white text-black hover:bg-black hover:text-white border-2 border-black fixed top-40 right-5 py-2 px-4 rounded-xl"
        onClick={onRestore}
      >
        Restore
      </button>
    </div>
  );
};

export default PergamentCanvas;
