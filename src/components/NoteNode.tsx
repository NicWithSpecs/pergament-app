import {
  Handle,
  NodeProps,
  Position,
  ReactFlowState,
  useStore,
} from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

const dragHandleStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: 12,
  backgroundColor: "black",
  border: "1px solid black",
  cursor: "move",
};

const arrowHandleStyle: React.CSSProperties = {
  display: "block",
  width: 12,
  height: 12,
  top: 2,
  right: 2,
  position: "absolute",
  backgroundColor: "orange",
  border: "none",
  borderRadius: "50%",
  transform: "none",
  cursor: "crosshair",
};

const arrowTargetStyle: React.CSSProperties = {
  display: "block",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "blue",
  border: "none",
  borderRadius: "0",
  transform: "none",
  opacity: 0,
  cursor: "crosshair",
};

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

function NoteNode({ selected }: NodeProps) {
  const [editing, setEditing] = useState(false);

  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <p>
        This is a note.
      </p>
      <p>
        Double click to edit.
      </p>
    `,
  });

  const handleDoubleClick = () => {
    setEditing(true);
    editor?.setEditable(true);
  };

  useEffect(() => {
    if (!selected) {
      setEditing(false);
      editor?.setEditable(false);
    }
  }, [selected, editor]);

  return (
    <div className="note-node" onDoubleClick={handleDoubleClick}>
      <div className="drag-handle" style={dragHandleStyle}>
        {!isConnecting && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
            style={arrowHandleStyle}
          />
        )}
      </div>

      {/* {editor && (
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>
      )} */}
      <div className={`note-content ${editing ? "nodrag editing" : ""}`}>
        <EditorContent editor={editor} />
      </div>
      <Handle
        className="arrowTarget"
        position={Position.Left}
        type="target"
        style={arrowTargetStyle}
        isConnectableStart={false}
      />
    </div>
  );
}

export default NoteNode;
