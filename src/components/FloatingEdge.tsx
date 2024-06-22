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
    useCallback((store) => store.nodeInternals.get(source), [source]),
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target]),
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
        class: "focus:outline-none dark:prose-invert",
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
    targetNode,
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
        style={{ strokeWidth: selected ? 2 : 1 }}
      />

      <EdgeLabelRenderer>
        {editor &&
          (selected || editor.storage.characterCount.characters() > 0) && (
            <div
              style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
              className={`nodrag nopan bg-zinc-200 dark:bg-zinc-900 ${
                selected ? "border p-2" : "p-1"
              } rounded-lg text-xs font-bold dark:border-zinc-700`}
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

export function ArrowTip() {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      className="fill-zinc-900 dark:fill-zinc-200"
    >
      <defs>
        <marker
          id="arrow-tip"
          orient="auto-start-reverse"
          viewBox="0 0 40 40"
          markerHeight={20}
          markerWidth={20}
          refX={15}
          refY={8}
        >
          <polygon
            id="arrowtip-2"
            data-name="arrowtip"
            className="cls-1"
            points="0 15.39 0 0 18.11 7.69 0 15.39"
          />
        </marker>
      </defs>
    </svg>
  );
}

export default FloatingEdge;
