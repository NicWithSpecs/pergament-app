import { NodeProps, ReactFlowState, useStore } from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";
import ResizeHandle from "./ResizeHandle";

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
    editor?.chain().focus();
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
      <ResizeHandle selected={selected} dragging={dragging} />
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

export default NoteNode;
