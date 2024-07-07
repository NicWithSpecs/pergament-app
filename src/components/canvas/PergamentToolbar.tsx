import { DragEvent, useCallback } from "react";
import nodeConfig from "../../nodeConfig";

const PergamentToolbar = () => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/pergament", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.effectAllowed = "none";
  }, []);

  return (
    <div
      className="absolute top-60 z-[1000] flex flex-col rounded-r-xl border border-zinc-300 bg-zinc-50 p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
      onDragOver={onDragOver}
    >
      {Object.entries(nodeConfig).map(([nodeType, node]) => {
        const Icon = node.icon;
        return (
          <span key={node.name + "-tooltip"} className="group relative">
            <div className="absolute left-[calc(100%)] top-[calc(50%-1rem)] hidden w-auto select-none group-hover:block">
              <div className="bottom-full whitespace-nowrap rounded bg-zinc-800 px-4 py-1 text-sm text-zinc-100">
                Add {node.name}
              </div>
            </div>
            <div>
              <div
                className="dndnode m-2 flex h-20 w-20 cursor-grab flex-col items-center justify-evenly rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2 shadow-md hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                key={node.name}
                onDragStart={(event) => onDragStart(event, nodeType)}
                draggable
              >
                <Icon className="h-6 w-6" />
                <label className="cursor-pointer text-xs">{node.name}</label>
              </div>
            </div>
          </span>
        );
      })}
    </div>
  );
};

export default PergamentToolbar;
