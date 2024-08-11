import { useEffect, useState } from "react";
import { NodeProps, ReactFlowState, useNodeId, useStore } from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import usePergamentStore, { NodeData } from "../../store";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";
import ResizeHandle from "./ResizeHandle";

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
    (state) => state.updateNodeContent,
  );
  const [editing, setEditing] = useState(false);
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;

  const editor = useEditor({
    extensions: [CustomDocument, Text, TaskList, CustomTaskItem],
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

  return (
    <div
      className={`node todo-node rounded-xl border-2 border-zinc-300 bg-zinc-50 p-4 accent-zinc-900 shadow duration-100 ease-in-out-bounce dark:border-zinc-700 dark:bg-zinc-800 dark:accent-zinc-50 ${
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
