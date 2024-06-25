import { NodeToolbar, Position } from "reactflow";
import { IconType } from "react-icons";
import ColorPicker from "./ColorPicker";

export type ToolbarElement =
  | EditorToolbarButtonData
  | EditorColorPickerData
  | EditorToolbarDivider;

type EditorToolbarButtonData = {
  type: "button";
  key: string;
  toolTipName: string;
  icon: IconType;
  isActive: boolean;
  editorFunction: () => void;
  headingLevel?: number | null;
};

export type EditorColorPickerData = {
  type: "colorPicker";
  toolTipName: string;
  activeColor: () => string;
  colorOptions: {
    color: string;
    isActive: boolean | undefined;
    editorFunction: () => void;
  }[];
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
      className="inline-flex items-center rounded-xl border border-zinc-300 bg-zinc-200 p-1 shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-xl"
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
                  : "text-zinc-800 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
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
        if (el.type === "colorPicker") {
          return <ColorPicker key="color-picker" colorPickerData={el} />;
        }
      })}
    </NodeToolbar>
  );
};

export default NodeEditorToolbar;
