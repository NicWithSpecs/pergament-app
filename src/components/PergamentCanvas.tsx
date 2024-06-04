import { useCallback, useState } from "react";
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

import { getHelperLines } from "../utils";
import HelperLines from "../components/HelperLine";

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
};

const PergamentCanvas = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const [helperLineHorizontal, setHelperLineHorizontal] = useState<
    number | undefined
  >(undefined);
  const [helperLineVertical, setHelperLineVertical] = useState<
    number | undefined
  >(undefined);

  const customApplyNodeChanges = useCallback(
    (changes: NodeChange[], nodes: Node[]): Node[] => {
      if (
        changes[0].type === "dimensions" &&
        changes[0].resizing &&
        changes[0].dimensions !== undefined
      ) {
        changes[0] = {
          ...changes[0],
          dimensions: {
            height: undefined!, // experimental solution
            width: changes[0].dimensions.width,
          },
        };
      }

      // reset the helper lines (clear existing lines, if any)
      setHelperLineHorizontal(undefined);
      setHelperLineVertical(undefined);

      // this will be true if it's a single node being dragged
      // inside we calculate the helper lines and snap position for the position where the node is being moved to
      if (
        changes.length === 1 &&
        changes[0].type === "position" &&
        changes[0].dragging &&
        changes[0].position
      ) {
        const helperLines = getHelperLines(changes[0], nodes);

        // if we have a helper line, we snap the node to the helper line position
        // this is being done by manipulating the node position inside the change object
        changes[0].position.x =
          helperLines.snapPosition.x ?? changes[0].position.x;
        changes[0].position.y =
          helperLines.snapPosition.y ?? changes[0].position.y;

        // if helper lines are returned, we set them so that they can be displayed
        setHelperLineHorizontal(helperLines.horizontal);
        setHelperLineVertical(helperLines.vertical);
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

  const addNode = () => {
    const newNode = {
      id: "note-" + self.crypto.randomUUID(),
      type: "noteNode",
      position: screenToFlowPosition({
        x: 300,
        y: 300,
      }),
      data: {},
      style: noteNodeStyle,
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
        deleteKeyCode={"Delete"}
      >
        <Controls />
        <HelperLines
          horizontal={helperLineHorizontal}
          vertical={helperLineVertical}
        />
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
