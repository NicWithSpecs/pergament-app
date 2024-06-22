import {
  NodeProps,
  NodeToolbar,
  ReactFlowState,
  useNodeId,
  useStore,
} from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect, useState } from "react";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";
import ResizeHandle from "./ResizeHandle";
import usePergamentStore, { NodeData } from "../store";
import { LuBold, LuItalic, LuUnderline } from "react-icons/lu";

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

function NoteNode({ selected, data, dragging }: NodeProps<NodeData>) {
  const nodeId = useNodeId();
  const updateNodeContent = usePergamentStore(
    (state) => state.updateNodeContent,
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
      Underline,
    ],
    content: data.content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-[1600px] focus:outline-none dark:prose-invert",
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
        updateNodeContent(nodeId, editor.getJSON());
      }
    }
  }, [selected, editor, nodeId, updateNodeContent]);

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  return (
    <>
      <NodeToolbar isVisible={editing} position={data.toolbarPosition}>
        <button
          onClick={toggleBold}
          className="m-1 rounded-xl border border-zinc-300 bg-zinc-50 p-2 shadow-md hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        >
          <LuBold />
        </button>
        <button
          onClick={toggleItalic}
          className="m-1 rounded-xl border border-zinc-300 bg-zinc-50 p-2 shadow-md hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        >
          <LuItalic />
        </button>
        <button
          onClick={toggleUnderline}
          className="m-1 rounded-xl border border-zinc-300 bg-zinc-50 p-2 shadow-md hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        >
          <LuUnderline />
        </button>
      </NodeToolbar>
      <div
        className={`node note-node rounded-xl border border-zinc-300 bg-zinc-50 p-4 shadow duration-100 ease-in-out-bounce dark:border-zinc-700 dark:bg-zinc-800 ${
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
    </>
  );
}

export default NoteNode;
