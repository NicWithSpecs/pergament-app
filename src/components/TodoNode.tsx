import { NodeProps, ReactFlowState, useNodeId, useStore } from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { useEffect, useState } from "react";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";
import ResizeHandle from "./ResizeHandle";
import usePergamentStore, { NodeData } from "../store";

const CustomDocument = Document.extend({
  content: "taskList",
});

const CustomTaskItem = TaskItem.extend({
  content: "inline*",
});

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

function TodoNode({ selected, data, dragging }: NodeProps<NodeData>) {
  const nodeId = useNodeId();
  const updateNodeContent = usePergamentStore(
    (state) => state.updateNodeContent
  );
  const [editing, setEditing] = useState(false);
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;

  const editor = useEditor({
    extensions: [CustomDocument, Text, TaskList, CustomTaskItem],
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
        updateNodeContent(nodeId, editor.getJSON());
      }
    }
  }, [selected, editor, nodeId, updateNodeContent]);

  return (
    <div
      className={`node todo-node bg-zinc-50 border border-zinc-300 shadow rounded-xl p-2 ease-in-out-bounce duration-100 ${
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
        className={`todo-content ${
          editing ? "nodrag cursor-text" : "pointer-events-none"
        }`}
      >
        <EditorContent editor={editor} spellCheck={false} />
      </div>
    </div>
  );
}

export default TodoNode;
