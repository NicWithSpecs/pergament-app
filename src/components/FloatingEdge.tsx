import { useCallback } from "react";
import {
  useStore,
  EdgeProps,
  getBezierPath,
  /* useReactFlow, */
  EdgeLabelRenderer,
  BaseEdge,
} from "reactflow";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { getEdgeParams } from "../utils";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";

const limit = 50;

function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style,
  selected,
  data,
}: EdgeProps) {
  /* const { setEdges } = useReactFlow(); */
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
    content: `
      <p>
        ${data.label}
      </p>
    `,
  });

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
        interactionWidth={15}
        style={style}
      />

      <EdgeLabelRenderer>
        {editor &&
          (selected || editor.storage.characterCount.characters() > 0) && (
            <div
              style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                background: "#e1dfdf",
                border: selected ? "1px solid #a1a1a1" : "none",
                padding: selected ? 6 : 3,
                borderRadius: 5,
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
                spellCheck="false"
              />
            </div>
          )}
      </EdgeLabelRenderer>
    </>
  );
}

export default FloatingEdge;
