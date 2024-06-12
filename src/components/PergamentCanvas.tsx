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
  NodeDragHandler,
  NodeDimensionChange,
} from "reactflow";

import "reactflow/dist/style.css";

import FloatingEdge from "../components/FloatingEdge";
import CustomConnectionLine from "../components/CustomConnectionLine";
import NoteNode from "../components/NoteNode";
import ImageNode from "./ImageNode";
import FrameNode from "./FrameNode";
import HeadingNode from "./HeadingNode";

const panOnDrag = [1, 2];
const proOptions = { hideAttribution: false };
const fitViewOptions = { padding: 4 };

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

const connectionLineStyle = {
  strokeWidth: 1,
  stroke: "black",
  zIndex: "-1 !important",
};

const noteNodeStyle = {
  width: 400,
};

const frameNodeStyle = {
  width: 400,
  height: 400,
  zIndex: -1,
};

const headingNodeStyle = {
  width: 400,
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
  const [rfInstance, setRfInstance] = useState(null);
  const { screenToFlowPosition, getIntersectingNodes } = useReactFlow();

  const customApplyNodeChanges = useCallback(
    (changes: NodeChange[], nodes: Node[]): Node[] => {
      const dimensionChange = changes[0] as NodeDimensionChange;
      if (
        changes[0].type === "dimensions" &&
        changes[0].resizing &&
        changes[0].dimensions !== undefined &&
        nodes.find((node) => node.id === dimensionChange.id)?.type ===
          "noteNode"
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

  const onNodeDrag: NodeDragHandler = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const intersections = getIntersectingNodes(node).map((n) => n.id);

      setNodes((ns) =>
        ns.map((n) => ({
          ...n,
          className:
            intersections.includes(n.id) &&
            n.type === "frameNode" &&
            node.type !== "frameNode"
              ? "frame-highlight"
              : "",
        }))
      );
    },
    []
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    (_: React.MouseEvent, node: Node) => {
      // find intersecting frame node
      const intersectingFrame = getIntersectingNodes(node).find(
        (node) => node.type === "frameNode"
      );

      if (
        intersectingFrame &&
        node.type !== "frameNode" &&
        node.parentId === ""
      ) {
        // parent or move inside of frame
        setNodes((nodes) =>
          nodes.map((n) => ({
            ...n,
            className: "",
            position:
              n.id === node.id && n.parentId !== intersectingFrame.id
                ? {
                    x: n.position.x - intersectingFrame.position.x,
                    y: n.position.y - intersectingFrame.position.y,
                  }
                : n.position,
            parentId: n.id === node.id ? intersectingFrame.id : n.parentId,
          }))
        );
      } else if (node.parentId !== "") {
        // unparent
        const parentNode = nodes.find((p) => p.id === node.parentId);
        setNodes((nodes) =>
          nodes.map((n) => ({
            ...n,
            className: "",
            position:
              n.id === node.id && parentNode
                ? {
                    x: parentNode.position.x + n.position.x,
                    y: parentNode.position.y + n.position.y,
                  }
                : n.position,
            parentId: n.id === node.id ? "" : n.parentId,
          }))
        );
      }
    },
    [setNodes, getIntersectingNodes, nodes]
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
      parentId: "",
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
        hasImage: false,
        image: {
          url: "https://www.wikimedia.de/wp-content/uploads/2021/09/Wikipedia-logo-v2-de.svg",
        },
      },
      parentId: "",
    };

    console.log(rfInstance.toObject());

    setNodes((nds) => nds.concat(newNode));
  };

  const addFrameNode = () => {
    const newNode = {
      id: "frame-" + self.crypto.randomUUID(),
      type: "frameNode",
      position: screenToFlowPosition({
        x: 300,
        y: 300,
      }),
      data: {},
      style: frameNodeStyle,
      parentId: "",
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const addHeadingNode = () => {
    const newNode = {
      id: "heading-" + self.crypto.randomUUID(),
      type: "headingNode",
      position: screenToFlowPosition({
        x: 300,
        y: 300,
      }),
      data: {
        content: ``,
      },
      style: headingNodeStyle,
      parentId: "",
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div id="pergament-canvas">
      <ReactFlow
        onInit={setRfInstance}
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
        proOptions={proOptions}
        fitView
        fitViewOptions={fitViewOptions}
        selectionOnDrag
        panOnDrag={panOnDrag}
        selectionMode={SelectionMode.Partial}
        selectNodesOnDrag={false}
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
        className="bg-black hover:bg-slate-600 fixed top-20 left-5 text-white font-bold py-2 px-4 rounded"
        onClick={addNoteNode}
      >
        Add Note
      </button>
      <button
        className="bg-black hover:bg-slate-600 fixed top-40 left-5 text-white font-bold py-2 px-4 rounded"
        onClick={addImageNode}
      >
        Add Image
      </button>
      <button
        className="bg-black hover:bg-slate-600 fixed top-60 left-5 text-white font-bold py-2 px-4 rounded"
        onClick={addFrameNode}
      >
        Add Frame
      </button>
      <button
        className="bg-black hover:bg-slate-600 fixed top-80 left-5 text-white font-bold py-2 px-4 rounded"
        onClick={addHeadingNode}
      >
        Add Heading
      </button>
    </div>
  );
};

export default PergamentCanvas;
