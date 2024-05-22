import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  SelectionMode,
} from "reactflow";

import NoteNode from "./components/NoteNode";

import "reactflow/dist/style.css";
import "./App.css";

const initialNodes = [
  { id: "1", position: { x: 300, y: 150 }, data: { label: "22" } },
  { id: "2", position: { x: 300, y: 300 }, data: { label: "2" } },
  {
    id: "node-1",
    type: "noteNode",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const panOnDrag = [1, 2];

const proOptions = { hideAttribution: true };

const nodeTypes = { noteNode: NoteNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
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
