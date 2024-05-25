import { Handle, NodeProps, Position } from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

const dragHandleStyle = {
  display: "block",
  width: "100%",
  height: 12,
  backgroundColor: "black",
  border: "1px solid black",
  cursor: "move",
};

function NoteNode({ selected }: NodeProps) {
  const [editing, setEditing] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <p>
        Try to select <em>this text</em> to see what we call the bubble menu.
      </p>
      <p>
        Neat, isn’t it? Add an empty paragraph to see the floating menu.
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
      <Handle type="target" position={Position.Top} isConnectable={true} />
      <span className="drag-handle" style={dragHandleStyle} />
      {editor && (
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>
      )}
      <div className={`note-content ${editing ? "nodrag editing" : ""}`}>
        <EditorContent editor={editor} />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={true}
      />
    </div>
  );
}

export default NoteNode;
