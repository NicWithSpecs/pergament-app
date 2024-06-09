import { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  addEdge,
  BackgroundVariant,
  SelectionMode,
  OnConnect,
  OnNodesChange,
  applyNodeChanges,
  NodeTypes,
  MarkerType,
  ConnectionMode,
  EdgeTypes,
  StraightEdge,
  useReactFlow,
  NodeChange,
} from "reactflow";

import "reactflow/dist/style.css";

import NoteNode from "../components/NoteNode";
import FloatingEdge from "../components/FloatingEdge";
import CustomConnectionLine from "../components/CustomConnectionLine";
import ImageNode from "./ImageNode";

const panOnDrag = [1, 2];
const proOptions = { hideAttribution: false };
const fitViewOptions = { padding: 4 };

const nodeTypes: NodeTypes = { noteNode: NoteNode, imageNode: ImageNode };

const edgeTypes: EdgeTypes = {
  floating: FloatingEdge,
  straight: StraightEdge,
};

const connectionLineStyle = {
  strokeWidth: 1,
  stroke: "black",
  zIndex: "-1 !important",
};

const noteNodeStyle = {
  width: 300,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
  data: { label: " " },
};

const PergamentCanvas = () => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const customApplyNodeChanges = useCallback(
    (changes: NodeChange[], nodes: Node[]): Node[] => {
      if (
        changes[0].type === "dimensions" &&
        changes[0].resizing &&
        changes[0].dimensions !== undefined &&
        nodes.find((node) => node.id === changes[0].id)?.type === "noteNode"
      ) {
        changes[0] = {
          ...changes[0],
          dimensions: {
            height: undefined!, // ! experimental solution
            width: changes[0].dimensions.width,
          },
        };
      }

      return applyNodeChanges(changes, nodes);
    },
    []
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => customApplyNodeChanges(changes, nds));
    },
    [setNodes, customApplyNodeChanges]
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNoteNode = () => {
    const newNode = {
      id: "note-" + self.crypto.randomUUID(),
      type: "noteNode",
      position: screenToFlowPosition({
        x: 300,
        y: 300,
      }),
      data: {
        content: ``,
      },
      style: noteNodeStyle,
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const addImageNode = () => {
    const newNode = {
      id: "image-" + self.crypto.randomUUID(),
      type: "imageNode",
      position: screenToFlowPosition({
        x: 300,
        y: 300,
      }),
      data: {
        image: {
          url: "https://www.wikimedia.de/wp-content/uploads/2021/09/Wikipedia-logo-v2-de.svg",
        },
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div id="pergament-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        elementsSelectable={true}
        proOptions={proOptions}
        fitView
        fitViewOptions={fitViewOptions}
        selectionOnDrag
        panOnDrag={panOnDrag}
        selectionMode={SelectionMode.Partial}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={connectionLineStyle}
        connectionMode={ConnectionMode.Loose}
        deleteKeyCode={"Delete"}
      >
        <Controls />
        <Background
          variant={BackgroundVariant.Dots}
          color="#a9a9a9"
          gap={10}
          size={1}
        />
      </ReactFlow>
      <button
        className="bg-black hover:bg-slate-600 fixed top-5 left-5 text-white font-bold py-2 px-4 rounded"
        onClick={addNoteNode}
      >
        Add Note
      </button>
      <button
        className="bg-black hover:bg-slate-600 fixed top-20 left-5 text-white font-bold py-2 px-4 rounded"
        onClick={addImageNode}
      >
        Add Image
      </button>
    </div>
  );
};

export default PergamentCanvas;
