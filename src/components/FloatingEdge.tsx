import { useCallback, useEffect } from "react";
import {
  useStore,
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
} from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { getEdgeParams } from "../utils";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import usePergamentStore, { EdgeData } from "../store";

const limit = 50;

function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  selected,
  data,
}: EdgeProps<EdgeData>) {
  const updateEdgeLabel = usePergamentStore((state) => state.updateEdgeLabel);
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Add label…",
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    content: data?.label,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!selected) {
      if (editor) {
        updateEdgeLabel(id, editor.getJSON());
      }
    }
  }, [selected, editor, id, updateEdgeLabel]);

  if (!sourceNode || !targetNode) {
    return null;
  }

  /* const focusEditor = () => {
    editor?.chain().focus();
  }; */

  /* const deleteEdge = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }; */

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  /* const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  }); */

  /* const [edgePathSmoothstep] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  }); */

  const [edgePathBezier, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePathBezier}
        markerEnd={markerEnd}
        interactionWidth={20}
        style={{ strokeWidth: selected ? 2 : 1, stroke: "#27272a" }}
      />

      <EdgeLabelRenderer>
        {editor &&
          (selected || editor.storage.characterCount.characters() > 0) && (
            <div
              style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                background: "#e4e4e7",
                border: selected ? "1px solid #d4d4d8" : "none",
                padding: selected ? 6 : 3,
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
              }}
              className="nodrag nopan"
            >
              <EditorContent
                editor={editor}
                style={{
                  pointerEvents: "all",
                  maxWidth: 100,
                  minWidth: 30,
                  textAlign: "center",
                }}
                className="edge-label"
                spellCheck="false"
              />
            </div>
          )}
      </EdgeLabelRenderer>
    </>
  );
}

export default FloatingEdge;
