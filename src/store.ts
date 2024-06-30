import { create } from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeDimensionChange,
  NodeDragHandler,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  Position,
  ReactFlowInstance,
  XYPosition,
} from "reactflow";
import { JSONContent } from "@tiptap/react";

export type NodeData = {
  content: JSONContent;
  color: string;
  toolbarPosition: Position;
};

export type EdgeData = {
  label: JSONContent;
};

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
  darkMode: boolean;
  setReactFlowInstance: (rfi: ReactFlowInstance) => void;
  setReactFlowKey: (key: string) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeContent: (nodeId: string | null, content: JSONContent) => void;
  updateEdgeLabel: (edgeId: string, label: JSONContent) => void;
  toggleDarkMode: () => void;
  addNote: (nodeType: string, position?: XYPosition) => void;
  setNodeColor: (nodeId: string | null, color: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const usePergamentStore = create<PergamentState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    const dimensionChangeId = (changes[0] as NodeDimensionChange).id;
    const changedNodeId = get().nodes.find(
      (node) => node.id === dimensionChangeId,
    );
    const changedNodeIsNote =
      changedNodeId?.type === "noteNode" || changedNodeId?.type === "todoNode";
    if (
      changes[0].type === "dimensions" &&
      changes[0].resizing &&
      changes[0].dimensions !== undefined &&
      changedNodeIsNote
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
  darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  setReactFlowInstance: (rfi: ReactFlowInstance) =>
    set({ reactFlowInstance: rfi }),
  setReactFlowKey: (key: string) => set({ reactFlowKey: key }),
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  updateNodeContent: (nodeId: string | null, content: JSONContent) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, content: content } };
        }
        return node;
      }),
    });
  },
  updateEdgeLabel: (edgeId: string, label: JSONContent) => {
    set({
      edges: get().edges.map((edge) => {
        if (edge.id === edgeId) {
          return { ...edge, data: { ...edge.data, label: label } };
        }
        return edge;
      }),
    });
  },
  toggleDarkMode: () => {
    set({ darkMode: !get().darkMode });
  },
  setNodeColor: (nodeId: string | null, color: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, color: color } };
        }
        return node;
      }),
    });
  },
  addNote: (nodeType, position) => {
    const newNode: Node = {
      id: nodeType + self.crypto.randomUUID(),
      type: nodeType,
      position: position ?? { x: 0, y: 0 },
      data: {},
      style: { width: 405 },
      parentId: "",
    };
    set({ nodes: get().nodes.concat(newNode) });
  },
}));

export default usePergamentStore;
