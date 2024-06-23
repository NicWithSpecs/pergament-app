import { IconType } from "react-icons";
import { NodeToolbar, Position } from "reactflow";

export type ToolbarElement = EditorToolbarButton | EditorToolbarDivider;

type EditorToolbarButton = {
  type: "button";
  key: string;
  toolTipName: string;
  icon: IconType;
  isActive: boolean;
  editorFunction: () => void;
  headingLevel?: number | null;
};

type EditorToolbarDivider = {
  type: "divider";
};

type EditorToolbarProps = {
  isVisible: boolean;
  position: Position;
  toolbarElements: ToolbarElement[];
};

const NodeEditorToolbar = ({
  isVisible,
  position,
  toolbarElements,
}: EditorToolbarProps) => {
  return (
    <NodeToolbar
      isVisible={isVisible}
      position={position}
      className="inline-flex rounded-xl border border-zinc-300 bg-zinc-200 p-1 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      {toolbarElements.map((el, index) => {
        if (el.type === "button") {
          return (
            <button
              key={el.key}
              onClick={el.editorFunction}
              className={`${
                el.isActive
                  ? "border-zinc-700 bg-zinc-800 text-zinc-100 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-800"
                  : "text-zinc-800 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 hover:dark:bg-zinc-800"
              } m-1 rounded-lg border p-2 hover:shadow`}
            >
              <el.icon />
            </button>
          );
        }
        if (el.type === "divider") {
          return (
            <div
              key={`divider-${index}`}
              className="mx-1 my-auto inline-block h-6 w-[1px] bg-zinc-300 dark:bg-zinc-700"
            ></div>
          );
        }
      })}
    </NodeToolbar>
  );
};

export default NodeEditorToolbar;
