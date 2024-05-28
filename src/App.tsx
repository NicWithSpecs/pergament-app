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
} from "reactflow";

import "reactflow/dist/style.css";
import "./App.css";
import NoteNode from "./components/NoteNode";
import FloatingEdge from "./components/FloatingEdge";
import CustomConnectionLine from "./components/CustomConnectionLine";

const initialNodes: Node[] = [
  {
    id: "node-1",
    type: "noteNode",
    position: { x: 0, y: 0 },
    data: {},
  },
  {
    id: "node-2",
    type: "noteNode",
    position: { x: 0, y: 350 },
    data: {},
  },
  {
    id: "node-3",
    type: "noteNode",
    position: { x: 300, y: 150 },
    data: {},
  },
];
const initialEdges = [
  { id: "e1-2", source: "node-1", target: "node-2", updatable: true },
];

const panOnDrag = [1, 2];

const proOptions = { hideAttribution: false };
const fitViewOptions = { padding: 2 };

const nodeTypes: NodeTypes = { noteNode: NoteNode };

const edgeTypes: EdgeTypes = {
  floating: FloatingEdge,
  straight: StraightEdge,
};

const connectionLineStyle = {
  strokeWidth: 1,
  stroke: "black",
  zIndex: "-1 !important",
};

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};

export default function App() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode = {
      id: "note-" + self.crypto.randomUUID(),
      type: "noteNode",
      position: {
        x: 0,
        y: 0,
      },
      data: {},
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div id="canvas">
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
        connectionRadius={70}
      >
        <Controls />
        <Background
          variant={BackgroundVariant.Dots}
          color="#cdcfd0"
          gap={12}
          size={1}
        />
      </ReactFlow>
      <button className="AddNodeBtn" onClick={addNode}>
        Add Node
      </button>
    </div>
  );
}
