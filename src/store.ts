import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  NodeDimensionChange,
  NodeDragHandler,
  ReactFlowInstance,
} from "reactflow";

export type PergamentState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeDrag: NodeDragHandler;
  onNodeDragStop: NodeDragHandler;
  reactFlowInstance: ReactFlowInstance | null;
  reactFlowKey: string;
  setReactFlowInstance: (rfi: ReactFlowInstance) => void;
  setReactFlowKey: (key: string) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<PergamentState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    const dimensionChange = changes[0] as NodeDimensionChange;
    if (
      changes[0].type === "dimensions" &&
      changes[0].resizing &&
      changes[0].dimensions !== undefined &&
      get().nodes.find((node) => node.id === dimensionChange.id)?.type ===
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

    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  onNodeDrag: (_: React.MouseEvent, node: Node) => {
    const intersections = get()
      .reactFlowInstance?.getIntersectingNodes(node)
      .map((n) => n.id);
    set({
      nodes: get().nodes.map((n) => ({
        ...n,
        className:
          intersections?.includes(n.id) &&
          n.type === "frameNode" &&
          node.type !== "frameNode"
            ? "frame-highlight"
            : "",
      })),
    });
  },
  onNodeDragStop: (_: React.MouseEvent, node: Node) => {
    const intersectingFrame = get()
      .reactFlowInstance?.getIntersectingNodes(node)
      .find((node) => node.type === "frameNode");

    if (intersectingFrame && node.type !== "frameNode") {
      // parent or move inside of frame
      set({
        nodes: get().nodes.map((n) => ({
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
        })),
      });
    } else if (node.parentId !== "") {
      // unparent
      const parentNode = get().nodes.find((p) => p.id === node.parentId);
      set({
        nodes: get().nodes.map((n) => ({
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
        })),
      });
    }
  },
  reactFlowInstance: null,
  reactFlowKey: "default",
  setReactFlowInstance: (rfi: ReactFlowInstance) =>
    set({ reactFlowInstance: rfi }),
  setReactFlowKey: (key: string) => set({ reactFlowKey: key }),
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
}));

export default useStore;