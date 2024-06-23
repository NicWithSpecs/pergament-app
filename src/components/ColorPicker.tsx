import { useState } from "react";
import { EditorColorPickerData } from "./NodeEditorToolbar";

type ColorPickerProps = {
  colorPickerData: EditorColorPickerData;
};

const ColorPicker = ({ colorPickerData }: ColorPickerProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div className="group relative">
      <button
        onClick={toggleDrawer}
        className={`${colorPickerData.activeColor === undefined ? "bg-zinc-900 dark:bg-zinc-100" : `bg-[${colorPickerData.activeColor}]`} m-1 h-6 w-6 rounded-full p-2 hover:shadow`}
      ></button>
      {drawerOpen && (
        <div className="absolute -top-12 right-0 flex content-center rounded-md border border-zinc-300 bg-zinc-200 p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          {colorPickerData.colorOptions.map((option) => {
            return (
              <button
                className={`mx-0.5 h-6 w-6 rounded-full ${option.isActive && "border-2 border-zinc-900 dark:border-zinc-100"} ${option.color === "default" ? "bg-zinc-900 dark:bg-zinc-100" : option.color}`}
                onClick={option.editorFunction}
                key={`color-${option.color}`}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
