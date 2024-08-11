import { useEffect, useState } from "react";
import { NodeProps, ReactFlowState, useNodeId, useStore } from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  LuBaseline,
  LuBold,
  LuBoxSelect,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuItalic,
  LuList,
  LuListOrdered,
  LuUnderline,
} from "react-icons/lu";
import usePergamentStore, { NodeData } from "../../store";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";
import ResizeHandle from "./ResizeHandle";
import NodeEditorToolbar, { ToolbarElement } from "./NodeEditorToolbar";

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

function NoteNode({ selected, data, dragging }: NodeProps<NodeData>) {
  const nodeId = useNodeId();
  const updateNodeContent = usePergamentStore(
    (state) => state.updateNodeContent,
  );
  const setNodeColor = usePergamentStore((state) => state.setNodeColor);
  const [editing, setEditing] = useState(false);

  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextStyle,
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

  const handleClick = () => {
    if (selected && !editing) {
      setEditing(true);
      editor?.chain().focus();
    }
  };

  useEffect(() => {
    if (!selected) {
      setEditing(false);
      if (editor) {
        updateNodeContent(nodeId, editor.getJSON());
      }
    }
  }, [selected, editor, nodeId, updateNodeContent]);

  const editorToolbarElements: ToolbarElement[] = [
    {
      type: "button",
      key: "bold",
      toolTipName: "Bold",
      icon: LuBold,
      isActive: editor?.isActive("bold") ?? false,
      editorFunction: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      type: "button",
      key: "italic",
      toolTipName: "Italic",
      icon: LuItalic,
      isActive: editor?.isActive("italic") ?? false,
      editorFunction: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      type: "button",
      key: "underline",
      toolTipName: "Underline",
      icon: LuUnderline,
      isActive: editor?.isActive("underline") ?? false,
      editorFunction: () => editor?.chain().focus().toggleUnderline().run(),
    },
    { type: "divider" },
    {
      type: "button",
      key: "bulletList",
      toolTipName: "Bullet list",
      icon: LuList,
      isActive: editor?.isActive("bulletList") ?? false,
      editorFunction: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      type: "button",
      key: "orderedList",
      toolTipName: "Ordered list",
      icon: LuListOrdered,
      isActive: editor?.isActive("orderedList") ?? false,
      editorFunction: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      type: "button",
      key: "codeBlock",
      toolTipName: "Code block",
      icon: LuCode,
      isActive: editor?.isActive("codeBlock") ?? false,
      editorFunction: () => editor?.chain().focus().toggleCodeBlock().run(),
    },
    { type: "divider" },
    {
      type: "button",
      key: "heading1",
      toolTipName: "Heading 1",
      icon: LuHeading1,
      isActive: editor?.isActive("heading", { level: 1 }) ?? false,
      editorFunction: () =>
        editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      type: "button",
      key: "heading2",
      toolTipName: "Heading 2",
      icon: LuHeading2,
      isActive: editor?.isActive("heading", { level: 2 }) ?? false,
      editorFunction: () =>
        editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      type: "button",
      key: "heading3",
      toolTipName: "Heading 3",
      icon: LuHeading3,
      isActive: editor?.isActive("heading", { level: 3 }) ?? false,
      editorFunction: () =>
        editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    { type: "divider" },
    {
      type: "colorPicker",
      toolTipName: "Text color",
      icon: LuBaseline,
      activeColor: editor?.getAttributes("textStyle").color,
      isActive: (color: string) =>
        color === "default"
          ? undefined
          : editor?.isActive("textStyle", { color: color }),
      setColor: (color: string) =>
        color === "default"
          ? editor?.chain().focus().unsetMark("textStyle").run()
          : editor!.chain().focus().setColor(color).run(),
      colorOptions: ["default", "#e11d48", "#3b82f6", "#22c55e", "#ea580c"],
    },
    {
      type: "colorPicker",
      toolTipName: "Node color",
      icon: LuBoxSelect,
      activeColor: data.color,
      isActive: (color: string) =>
        color === "default" ? undefined : data.color === color,
      setColor: (color: string) => setNodeColor(nodeId, color),
      colorOptions: ["default", "#e11d48", "#3b82f6", "#22c55e", "#ea580c"],
    },
  ];

  return (
    <>
      {editing && (
        <NodeEditorToolbar
          isVisible={editing}
          position={data.toolbarPosition}
          toolbarElements={editorToolbarElements}
        />
      )}
      <div
        className={`node note-node rounded-xl border-2 border-zinc-300 bg-zinc-50 p-4 shadow duration-100 ease-in-out-bounce dark:border-zinc-700 dark:bg-zinc-800 ${
          selected || dragging
            ? "border-zinc-900 shadow-3xl dark:border-zinc-300"
            : ""
        }`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={data.color !== "default" ? { borderColor: data.color } : {}}
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
