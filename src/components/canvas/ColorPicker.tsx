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
    <div className="group relative mx-1">
      <button
        onClick={toggleDrawer}
        className={
          "m-1 rounded-lg border border-zinc-400 p-2 text-zinc-900 hover:shadow dark:border-zinc-600 dark:text-zinc-100"
        }
        style={
          colorPickerData.activeColor !== undefined
            ? {
                color: `${colorPickerData.activeColor}`,
              }
            : {}
        }
      >
        <colorPickerData.icon />
      </button>
      {drawerOpen && (
        <div className="absolute -top-12 right-0 flex content-center rounded-md border border-zinc-300 bg-zinc-200 p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          {colorPickerData.colorOptions.map((option) => {
            return (
              <button
                className={`mx-0.5 h-6 w-6 rounded-full hover:scale-125 ${colorPickerData.isActive(option) && "border-2 border-zinc-900 dark:border-zinc-100"} ${option === "default" && "bg-zinc-900 dark:bg-zinc-100"}`}
                onClick={() => colorPickerData.setColor(option)}
                key={`color-${option}`}
                style={
                  option !== "default" ? { backgroundColor: `${option}` } : {}
                }
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
