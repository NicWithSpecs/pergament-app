import { IconType } from "react-icons";

export interface PergamentToolbarProps {
  noteFunctions: {
    name: string;
    createFunction: () => void;
    icon: IconType;
  }[];
}

const PergamentToolbar = ({ noteFunctions }: PergamentToolbarProps) => {
  return (
    <div className="absolute top-60 z-[1000] flex flex-col rounded-r-xl border border-zinc-300 bg-zinc-50 p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      {noteFunctions.map((note) => {
        const Icon = note.icon;
        return (
          <span key={note.name + "-tooltip"} className="group relative">
            <div className="absolute left-[calc(100%)] top-[calc(50%-1rem)] hidden w-auto select-none group-hover:block">
              <div className="bottom-full whitespace-nowrap rounded bg-zinc-800 px-4 py-1 text-sm text-zinc-100">
                Add {note.name}
              </div>
            </div>
            <div>
              <button
                className="tool m-2 flex h-20 w-20 flex-col items-center justify-evenly rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2 shadow-md hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                onClick={note.createFunction}
                key={note.name}
              >
                <Icon className="h-6 w-6" />
                <label className="cursor-pointer text-xs">{note.name}</label>
              </button>
            </div>
          </span>
        );
      })}
    </div>
  );
};

export default PergamentToolbar;
