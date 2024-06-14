import { NodeProps, NodeResizer, ReactFlowState, useStore } from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";

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

        <ArrowHandle
          isConnecting={isConnecting}
          selected={selected}
          dragging={dragging}
        />
        <ArrowTarget isConnecting={isConnecting} />
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
