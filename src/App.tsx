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
} from "reactflow";

import NoteNode from "./components/NoteNode";

import "reactflow/dist/style.css";
import "./App.css";

const initialNodes: Node[] = [
  { id: "1", position: { x: 300, y: 150 }, data: { label: "Hello" } },
  { id: "2", position: { x: 300, y: 300 }, data: { label: "World" } },
  {
    id: "node-1",
    type: "noteNode",
    /* dragHandle: ".drag-handle", */
    position: { x: 0, y: 0 },
    data: {},
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const panOnDrag = [1, 2];

const proOptions = { hideAttribution: false };

const nodeTypes: NodeTypes = { noteNode: NoteNode };

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

  return (
    <div id="canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        elementsSelectable={true}
        proOptions={proOptions}
        fitView
        selectionOnDrag
        panOnDrag={panOnDrag}
        selectionMode={SelectionMode.Partial}
      >
        <Controls />
        <Background
          variant={BackgroundVariant.Dots}
          color="#cdcfd0"
          gap={10}
          size={1}
        />
      </ReactFlow>
    </div>
  );
}
