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
} from "reactflow";

import "reactflow/dist/style.css";
import NoteNode from "../components/NoteNode";
import FloatingEdge from "../components/FloatingEdge";
import CustomConnectionLine from "../components/CustomConnectionLine";

const initialNodes: Node[] = [];

const panOnDrag = [1, 2];
/* const snapGrid = [12, 12]; */
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

const PergamentCanvas = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

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
      position: screenToFlowPosition({
        x: 300,
        y: 300,
      }),
      data: {},
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div id="canvas">
      <ReactFlow
        /* snapToGrid={true}
        snapGrid={snapGrid} */
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
          color="#a9a9a9"
          gap={10}
          size={1}
        />
      </ReactFlow>
      <button className="AddNodeBtn" onClick={addNode}>
        Add Node
      </button>
    </div>
  );
};

export default PergamentCanvas;
