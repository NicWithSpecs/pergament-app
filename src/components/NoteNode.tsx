import {
  NodeProps,
  NodeResizeControl,
  ReactFlowState,
  ResizeControlVariant,
  useStore,
} from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";

const resizerStyle: React.CSSProperties = {
  position: "absolute",
  background: "transparent",
  border: "none",
  top: "100%",
  right: "-70",
};

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

function NoteNode({ selected, data, dragging }: NodeProps) {
  const [editing, setEditing] = useState(false);

  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;
  /* const isTarget = connectionNodeId && connectionNodeId !== id; */

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    content: data.content,
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none",
      },
    },
  });

  const handleDoubleClick = () => {
    setEditing(true);
    /* editor?.setEditable(true); */
  };

  useEffect(() => {
    if (!selected) {
      setEditing(false);
      /* editor?.setEditable(false); */
    }
  }, [selected, editor]);

  return (
    <div className="node note-node" onDoubleClick={handleDoubleClick}>
      <NodeResizeControl
        className={`customHandle ${selected && !dragging ? "" : "hide"}`}
        style={resizerStyle}
        minWidth={150}
        minHeight={100}
        variant={ResizeControlVariant.Line}
      >
        <ResizeIcon />
      </NodeResizeControl>

      <ArrowHandle
        isConnecting={isConnecting}
        selected={selected}
        dragging={dragging}
      />
      <ArrowTarget isConnecting={isConnecting} />
      <div
        className={`note-content ${editing ? "nodrag editing" : "uneditable"}`}
      >
        <EditorContent editor={editor} spellCheck={false} />
      </div>
    </div>
  );
}

export function ResizeIcon() {
  return (
    <svg
      className="resize-icon"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
      height="11"
      fill="none"
    >
      <rect
        rx=".658"
        ry=".658"
        x="4.842"
        y="-1.62"
        transform="rotate(45 5.5 5.5)"
        width="1.316"
        height="14.24"
        style={{ fill: "rgb(0, 0, 0)", fillOpacity: 0.5 }}
        className="fills"
      />
      <rect
        rx=".678"
        ry=".678"
        x="7.232"
        y="4.34"
        transform="rotate(45 7.91 7.91)"
        width="1.356"
        height="7.14"
        style={{ fill: "rgb(0, 0, 0)", fillOpacity: 0.5 }}
        className="fills"
      />
    </svg>
  );
}

export default NoteNode;
