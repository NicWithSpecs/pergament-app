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
import { FaLongArrowAltRight } from "react-icons/fa";

/* const noteHeaderStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: 12,
  backgroundColor: "black",
  border: "1px solid black",
  cursor: "move",
  opacity: 0,
}; */

const arrowHandleStyle: React.CSSProperties = {
  display: "block",
  width: 11,
  height: 11,
  top: -12,
  right: 1,
  position: "absolute",
  backgroundColor: "white",
  borderRadius: "50%",
  transform: "none",
  cursor: "crosshair",
  textAlign: "center",
  lineHeight: "9px",
  fontWeight: "bold",
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
        <strong>This is a note.</strong>
      </p>
      <p>
        Drag to move.<br>
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
      {!isConnecting && (
        <>
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
            style={arrowHandleStyle}
          >
            <FaLongArrowAltRight
              style={{
                pointerEvents: "none",
                fontSize: 11,
                lineHeight: "0",
                verticalAlign: "middle",
              }}
            />
          </Handle>
        </>
      )}

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
      {isConnecting && <div className="blob"></div>}
    </div>
  );
}

export default NoteNode;
