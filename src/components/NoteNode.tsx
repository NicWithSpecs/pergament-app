import { NodeProps, ReactFlowState, useNodeId, useStore } from "reactflow";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";
import ResizeHandle from "./ResizeHandle";

import usePergamentStore from "../store";

export type NodeData = {
  content: JSONContent;
};

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

function NoteNode({ selected, data, dragging }: NodeProps<NodeData>) {
  const nodeId = useNodeId();
  const updateNodeContent = usePergamentStore(
    (state) => state.updateNodeContent
  );
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
        class: "prose prose-sm max-w-[1600px] focus:outline-none",
      },
    },
  });

  const handleDoubleClick = () => {
    setEditing(true);
    editor?.chain().focus();
  };

  useEffect(() => {
    if (!selected) {
      setEditing(false);
      if (editor) {
        updateNodeContent(nodeId ?? "", editor.getJSON());
      }
    }
  }, [selected, editor, nodeId, updateNodeContent]);

  return (
    <div
      className={`node note-node bg-white border-4 border-black rounded-xl p-2 ease-in-out-bounce duration-100 ${
        selected || dragging ? "shadow-3xl" : ""
      }`}
      onDoubleClick={handleDoubleClick}
    >
      <ResizeHandle selected={selected} dragging={dragging} />
      <ArrowHandle
        isConnecting={isConnecting}
        selected={selected}
        dragging={dragging}
      />
      <ArrowTarget isConnecting={isConnecting} />
      <div
        className={`note-content ${
          editing ? "nodrag cursor-text" : "pointer-events-none"
        }`}
      >
        <EditorContent editor={editor} spellCheck={false} />
      </div>
    </div>
  );
}

export default NoteNode;
