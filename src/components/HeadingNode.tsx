import {
  NodeProps,
  NodeResizer,
  ReactFlowState,
  useNodeId,
  useStore,
} from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import ArrowTarget from "./ArrowTarget";
import ArrowHandle from "./ArrowHandle";
import { useEffect, useState } from "react";
import usePergamentStore, { NodeData } from "../store";

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

const HeadingNode = ({ selected, data, dragging }: NodeProps<NodeData>) => {
  const nodeId = useNodeId();
  const updateNodeContent = usePergamentStore(
    (state) => state.updateNodeContent
  );
  const [editing, setEditing] = useState(false);
  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;

  const CustomDocument = Document.extend({
    content: "heading",
  });

  const editor = useEditor({
    extensions: [
      CustomDocument,
      Text,
      Heading.configure({ levels: [2] }),
      Placeholder.configure({
        placeholder: "Add a heading …",
      }),
    ],
    content: data.content,
    editorProps: {
      attributes: {
        class:
          "prose prose-md text-center focus:outline-none dark:prose-invert",
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
      if (editor) {
        updateNodeContent(nodeId ?? "", editor.getJSON());
      }
      /* editor?.setEditable(false); */
    }
  }, [selected, editor, nodeId, updateNodeContent]);

  return (
    <>
      <div
        className={`node heading-node p-2 ease-in-out-bounce duration-100 w-full h-full overflow-hidden ${
          selected || dragging ? "shadow-3xl" : ""
        }`}
        onDoubleClick={handleDoubleClick}
      >
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
            editing ? "nodrag cursor-text" : "pointer-events-none"
          }`}
        >
          <EditorContent editor={editor} spellCheck={false} />
        </div>
      </div>
    </>
  );
};

export default HeadingNode;
