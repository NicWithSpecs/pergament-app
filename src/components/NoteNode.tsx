import {
  Handle,
  NodeProps,
  NodeResizeControl,
  Position,
  ReactFlowState,
  ResizeControlVariant,
  useStore,
} from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const arrowHandleStyle: React.CSSProperties = {
  display: "block",
  width: 11,
  height: 11,
  top: 2,
  right: 2,
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

const resizerStyle: React.CSSProperties = {
  position: "absolute",
  background: "transparent",
  border: "none",
  top: "100%",
  right: "-70",
};

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

function NoteNode({ selected, data }: NodeProps) {
  const [editing, setEditing] = useState(false);

  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;

  const editor = useEditor({
    extensions: [StarterKit],
    content: data.content,
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none",
      },
    },
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
      {selected && (
        <NodeResizeControl
          style={resizerStyle}
          minWidth={100}
          minHeight={100}
          variant={ResizeControlVariant.Line}
        >
          <ResizeIcon />
        </NodeResizeControl>
      )}
      {!isConnecting && (
        <>
          <Handle
            className={`customHandle ${selected ? "" : "invisible"}`}
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
      <div
        className={`note-content ${editing ? "nodrag editing" : "uneditable"}`}
      >
        <EditorContent editor={editor} />
      </div>
      <Handle
        className="arrowTarget"
        position={Position.Left}
        type="target"
        style={arrowTargetStyle}
        isConnectableStart={false}
      />
      {isConnecting && !selected && <div className="connection-indicator" />}
    </div>
  );
}

function ResizeIcon() {
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
