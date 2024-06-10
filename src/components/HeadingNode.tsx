import {
  Handle,
  NodeProps,
  NodeResizer,
  Position,
  ReactFlowState,
  useStore,
} from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

const arrowHandleStyle: React.CSSProperties = {
  display: "block",
  width: 11,
  height: 11,
  top: -4,
  right: -4,
  position: "absolute",
  backgroundColor: "black",
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
  right: 0,
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

const HeadingNode = ({ selected, data, dragging }: NodeProps) => {
  const [editing, setEditing] = useState(false);

  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;

  const CustomDocument = Document.extend({
    content: "heading block*",
  });

  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: "Add a heading …",
      }),
    ],
    content: data.content,
    editorProps: {
      attributes: {
        class: "prose prose-sm text-center focus:outline-none",
      },
    },
  });

  useEffect(() => {
    setEditing(selected ? true : false);
  }, [selected, editor]);

  return (
    <>
      <div className="node heading-node overflow-hidden">
        <NodeResizer
          minWidth={30}
          minHeight={30}
          keepAspectRatio={false}
          isVisible={selected}
        />

        {!isConnecting && (
          <Handle
            className={`customHandle ${selected && !dragging ? "" : "hide"}`}
            position={Position.Right}
            type="source"
            style={arrowHandleStyle}
          />
        )}
        <Handle
          className="arrowTarget"
          position={Position.Left}
          type="target"
          style={arrowTargetStyle}
          isConnectableStart={!isConnecting ? false : true}
        />
        <div
          className={`heading-content ${
            editing ? "nodrag editing" : "uneditable"
          }`}
        >
          <EditorContent editor={editor} spellCheck={false} />
        </div>
      </div>
    </>
  );
};

export default HeadingNode;
